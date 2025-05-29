// 범위 전부로 지정하기 전
// import { Injectable } from '@nestjs/common';

// import axios from 'axios';
// import * as cheerio from 'cheerio';

// import * as puppeteer from 'puppeteer';
// import { PrismaService } from 'src/prisma.service';

// interface KBOGameData {
//   awayPitcher: string;
//   homePitcher: string;
//   awayPitcherImg: string | undefined;
//   homePitcherImg: string | undefined;
//   broadimage: string | undefined; // 날씨 이미지
//   stime: string; // 경기 시작시간
//   gameID: string | undefined;
// }
// // https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/person/kbo/2025/67143.png
// const cssHeader = {
//   'User-Agent':
//     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
// };
// // 선발투수 크롤링
// @Injectable()
// export class CrawlingService {
//   constructor(private readonly prisma: PrismaService) {}

//   // url에서 바로 json 받아오기, param이 고정이라는 가정하에
//   async getStartPitcherWithURL() {
//     const paramDate = this.getParamDate();
//     const URL = `https://www.koreabaseball.com/ws/Main.asmx/GetKboGameList?leId=1&srId=0%2C1%2C3%2C4%2C5%2C6%2C7%2C8%2C9&date=${paramDate}`;

//     const headers = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     };

//     try {
//       const response = await axios.get(URL, {
//         headers,
//       });
//       console.log('json 받아오기 성공? : ');
//       console.log(response.data);

//       //@ts-ignore
//       const jdata = response.data;
//       // prisma 저장
//       const datas = jdata.map((game) => {});
//       return response.data;
//     } catch (error) {
//       console.error('크롤링 에러남 :', error);
//       return null;
//     }
//   }

//   // css 선택자로 크롤링
//   async crawlerStartPither(): Promise<any> {
//     console.log('crawlerStartPither');
//     const URL = 'https://www.koreabaseball.com/Schedule/GameCenter/Main.aspx';

//     const browser = await puppeteer.launch({
//       headless: true,
//     });

//     // 게임 아이디만 따로 추려
//     const gameIds: string[] = [];

//     try {
//       const page = await browser.newPage();
//       //페이지 로드 대기
//       await page.goto(URL, { waitUntil: 'networkidle0' });

//       // 페이지 열렸는지 확인
//       await page.waitForSelector('.today-game .game-cont', { timeout: 1000 });

//       // html 태그로 내용 갖고오기
//       const content = await page.content();
//       const $ = cheerio.load(content);
//       const games: KBOGameData[] = [];

//       // 추가
//       // const gameHandles = await page.$$('.today-game .game-cont');
//       const gameHandles = await page.$$('.today-game .game-cont');
//       for (const gameEl of gameHandles) {
//         await gameEl.click();

//         await page.waitForFunction(
//           (el) => getComputedStyle(el).display !== 'none',
//           {},
//           gameEl,
//         );

//         // 로딩됐는지 확인
//         await page.waitForSelector('.tbl tbl-pitcher');

//         // 로딩된 다음 데이터 긁어오기
//         const gameData = await page.evaluate((el) => {
//           const game = el as HTMLElement; // '.today-game .game-cont'

//           const getText = (selector: string) => {
//             const el = game.querySelector(selector);
//             return el?.textContent?.trim().slice(1) ?? '';
//           };

//           const getImgAttr = (selector: string, attr: string) => {
//             const el = game.querySelector(selector) as HTMLImageElement;
//             return el?.getAttribute(attr) ?? '';
//           };

//           // console.log('game', game);
//           // console.log('@@@@@ ');

//           return {
//             awayPitcher: getText('.team.away .today-pitcher p'),
//             homePitcher: getText('.team.home .today-pitcher p'),
//             broadimage: `https:${getImgAttr('.top li:nth-child(2) img', 'src')}`,
//             stime:
//               game.querySelector('.top li:nth-child(3)')?.textContent?.trim() ??
//               '',
//             homePitcherImg: `https:${getImgAttr('.tbl tbody tr:nth-child(1) td:nth-child(1) .pitcher-cell .img .player-img img:nth-of-type(2) ', 'src')}`,
//             // awayPitcherImg: `https:${getImgAttr('.tbl tbody tr:nth-child(2) td:pitcher-child(1) img', 'src')}`,
//             gameID: game.getAttribute('g_id') ?? undefined,
//           };
//         }, gameEl);
//         // games.push(gameData);
//         console.log(gameData);

//         // 대기
//         await new Promise((resolve) => setTimeout(resolve, 200));
//       }

//       // 여기서는 비동기 작업이안된다 cheerio
//       // $('.today-game .game-cont').each((_, el) => {
//       //   const game = $(el);

//       //   const awayPitcher = game
//       //     .find('.team.away .today-pitcher p')
//       //     .text()
//       //     .trim()
//       //     .slice(1);
//       //   const homePitcher = game
//       //     .find('.team.home .today-pitcher p')
//       //     .text()
//       //     .trim()
//       //     .slice(1);

//       //   const gameData = {
//       //     awayPitcher: awayPitcher,
//       //     homePitcher: homePitcher,
//       //     broadimage: `https:${game.find('.top li:nth-child(2) img').attr('src')}`,
//       //     stime: game.find('.top li:nth-child(3)').text().trim(),
//       //     awayPitcherImg: undefined,
//       //     homePitcherImg: undefined,
//       //     gameID: game.attr('g_id'),
//       //   };

//       //   const gameIddata = game.attr('g_id');

//       //   if (gameIddata) {
//       //     gameIds.push(gameIddata);
//       //   }
//       //   games.push(gameData);
//       // });

//       // console.log('잘 추출했냐');
//       // console.log(games); // 잘 추출했다 이제 이미지 추출하자...

//       //일단 url로 받아와..?
//       // 여기서 each 또 돌
//       // waitForResponse()
//       // const liHandles = await page.$$('.today-game > .game-cont');

//       // for(const liHandle of liHandles){
//       //   // li 클릭, 네트워크 응답대기
//       //   const [response] = await Promise.all([
//       //     page.waitForResponse(res => res.request().method() === 'Post' &&)
//       //   ])
//       // }

//       return games;
//       // 이제 클릭 돌면서 선수 이미지 받아와
//     } catch (error) {
//       console.error(error);
//     } finally {
//       await browser.close();
//     }
//   }

//   // 모든 선수 이름, 팀, 사진 크롤링
//   // https://www.koreabaseball.com/Player/Search.aspx
//   async crawlAllPlayer(): Promise<void> {
//     const url = 'https://www.koreabaseball.com/Player/Search.aspx';

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // <select name="ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$ddlTeam" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$ddlTeam\',\'\')', 0)" id="cphContents_cphContents_cphContents_ddlTeam" class="select02">
//     // 	<option selected="selected" value="">팀 선택</option>
//     // 	<option value="LG">LG</option>
//     // 	<option value="HH">한화</option>
//     // 	<option value="LT">롯데</option>
//     // 	<option value="KT">KT</option>
//     // 	<option value="SS">삼성</option>
//     // 	<option value="SK">SSG</option>
//     // 	<option value="NC">NC</option>
//     // 	<option value="HT">KIA</option>
//     // 	<option value="OB">두산</option>
//     // 	<option value="WO">키움</option>

//     // </select>
//     const teamOptions = await page.$$eval(
//       '#cphContents_cphContents_cphContents_ddlTeam option',
//       (options) =>
//         options
//           .filter((opt) => opt.value !== '' && opt.value !== '팀 선택')
//           .map((opt) => ({ name: opt.textContent?.trim(), value: opt.value })),
//     );
//     /* 검색버튼
// <input type="submit" name="ctl00$ctl00$ctl00$cphContents$cphContents$cphContents$btnSearch"
// value="검색" id="cphContents_cphContents_cphContents_btnSearch" class="btn_srch02">
// */
//     // for (const team of teamOptions) {
//     //   await page.select(
//     //     '#cphContents_cphContents_cphContents_ddlTeam option',
//     //     team.value,
//     //   );
//     //   await page.click('#cphContents_cphContents_cphContents_btnSearch');
//     //   await page.waitForSelector()
//     // }
//   }

//   // 그날그날 날짜 포메터
//   getParamDate() {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     return `${year}${month}${day}`;
//   }
// }
