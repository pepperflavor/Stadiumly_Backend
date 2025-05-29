import { Injectable } from '@nestjs/common';

import axios from 'axios';
import * as cheerio from 'cheerio';

import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma.service';

interface KBOGameData {
  awayPitcher: string;
  homePitcher: string;
  awayPitcherImg: string | undefined;
  homePitcherImg: string | undefined;
  broadimage: string | undefined; // 날씨 이미지
  stime: string; // 경기 시작시간
  gameID: string | undefined;
}

// https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/person/kbo/2025/67143.png
const cssHeader = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};
// 선발투수 크롤링
@Injectable()
export class CrawlingService {
  constructor(private readonly prisma: PrismaService) {}

  // url에서 바로 json 받아오기, param이 고정이라는 가정하에
  async getStartPitcherWithURL() {
    const paramDate = this.getParamDate();
    const URL = `https://www.koreabaseball.com/ws/Main.asmx/GetKboGameList?leId=1&srId=0%2C1%2C3%2C4%2C5%2C6%2C7%2C8%2C9&date=${paramDate}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.get(URL, {
        headers,
      });
      console.log('json 받아오기 성공? : ');
      console.log(response.data);

      //@ts-ignore
      const jdata = response.data;
      // prisma 저장
      const datas = jdata.map((game) => {});
      return response.data;
    } catch (error) {
      console.error('크롤링 에러남 :', error);
      return null;
    }
  }

  // css 선택자로 크롤링
  async crawlerStartPither(): Promise<any> {
    console.log('crawlerStartPither');
    const URL = 'https://www.koreabaseball.com/Schedule/GameCenter/Main.aspx';

    const browser = await puppeteer.launch({
      headless: true,
    });

    try {
      const page = await browser.newPage();
      //페이지 로드 대기
      await page.goto(URL, { waitUntil: 'networkidle0' });

      // 브라우저 콘솔 로그를 Node.js 콘솔로 전달
      page.on('console', (msg) => console.log('Browser Console:', msg.text()));

      await page.waitForSelector('.today-game .game-cont', { timeout: 1000 });

      // html 태그로 내용 갖고오기
      const content = await page.content();
      const $ = cheerio.load(content);
      const games: KBOGameData[] = [];

      // 추가
      const gameHandles = await page.$$('.today-game .game-cont');
      for (const gameEl of gameHandles) {
        const gameElContent = await page.evaluate((el) => el.outerHTML, gameEl);

        await gameEl.click();

        await page.waitForFunction(
          () => {
            const element = document.querySelector('#gameCenterContents');
            const hasContent = element && element.innerHTML.trim().length > 0;
            return hasContent;
          },
          {
            timeout: 5000,
            polling: 100, // 100ms마다 체크
          },
        );

        // 내용이 채워진 후 DOM 가져오기
        const newContent = await page.evaluate(() => {
          const newElement = document.querySelector('#gameCenterContents');
          return newElement ? newElement.innerHTML : null; // innerHTML 반환
        });

        // cheerio로 HTML 파싱
        const $ = cheerio.load(newContent || '');

        // 로딩된 다음 데이터 긁어오기
        const gameData = await page.evaluate((el) => {
          const game = el as HTMLElement;

          const getText = (selector: string) => {
            const el = game.querySelector(selector);
            return el?.textContent?.trim().slice(1) ?? '';
          };

          const getImgAttr = (selector: string, attr: string) => {
            const el = game.querySelector(selector) as HTMLImageElement;
            return el?.getAttribute(attr) ?? '';
          };

          const getImgAttr2 = (selector: string, attr: string) => {
            const el = $(selector);
            return el.attr(attr) ?? '';
          };

          return {
            awayPitcher: getText('.team.away .today-pitcher p'),
            homePitcher: getText('.team.home .today-pitcher p'),
            broadimage: `https:${getImgAttr('.top li:nth-child(2) img', 'src')}`,
            stime:
              game.querySelector('.top li:nth-child(3)')?.textContent?.trim() ??
              '',
            homePitcherImg: `https:${getImgAttr2('.tbl-pitcher tbody tr:first-child td.pitcher .player-img img.team', 'src')}`,
            awayPitcherImg: `https:${getImgAttr2('.tbl-pitcher tbody tr:nth-child(2) td.pitcher .player-img img.team', 'src')}`,
            gameID: game.getAttribute('g_id') ?? undefined,
          };
        }, gameEl);
        games.push(gameData);
        console.log(games);

        // 대기
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      return games;
      // 이제 클릭 돌면서 선수 이미지 받아와
    } catch (error) {
      console.error(error);
    } finally {
      await browser.close();
    }
  }

  // 그날그날 날짜 포메터
  getParamDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
}
