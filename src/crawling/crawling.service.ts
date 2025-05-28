import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma.service';

// 선발투수 크롤링
@Injectable()
export class CrawlingService {
  constructor(private readonly prisma: PrismaService) {}

  // url에서 바로 json 받아오기, param이 고정이라는 가정하에
  async getStartPitcherWithURL() {
    const paramDate = this.getParamDate();
    console.log('크롤링 서비스 : ');
    console.log(paramDate);

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
      return response.data;
    } catch (error) {
      console.error('크롤링 에러남 :', error);
      return null;
    }
  }

  async crawerStartPither(data: string): Promise<any> {
    const browser = await puppeteer.launch({
      headless: true,
    });

    try {
      const page = await browser.newPage();

      //페이지 로드 대기
      // await page.goto()
    } catch (error) {
      console.error(error);
    }
  }

  // 모든 선수 이름, 팀, 사진 크롤링
  // https://www.koreabaseball.com/Player/Search.aspx
  async crawlAllPlayer(): Promise<void> {
    const url = 'https://www.koreabaseball.com/Player/Search.aspx';

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // <select name="ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$ddlTeam" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$ddlTeam\',\'\')', 0)" id="cphContents_cphContents_cphContents_ddlTeam" class="select02">
    // 	<option selected="selected" value="">팀 선택</option>
    // 	<option value="LG">LG</option>
    // 	<option value="HH">한화</option>
    // 	<option value="LT">롯데</option>
    // 	<option value="KT">KT</option>
    // 	<option value="SS">삼성</option>
    // 	<option value="SK">SSG</option>
    // 	<option value="NC">NC</option>
    // 	<option value="HT">KIA</option>
    // 	<option value="OB">두산</option>
    // 	<option value="WO">키움</option>

    // </select>
    const teamOptions = await page.$$eval(
      '#cphContents_cphContents_cphContents_ddlTeam option',
      (options) =>
        options
          .filter((opt) => opt.value !== '' && opt.value !== '팀 선택')
          .map((opt) => ({ name: opt.textContent?.trim(), value: opt.value })),
    );
    /* 검색버튼
<input type="submit" name="ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$btnSearch" 
value="검색" id="cphContents_cphContents_cphContents_btnSearch" class="btn_srch02">
*/
    for (const team of teamOptions) {
      await page.select(
        '#cphContents_cphContents_cphContents_ddlTeam option',
        team.value,
      );
      await page.click('#cphContents_cphContents_cphContents_btnSearch');
      await page.waitForSelector()
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
