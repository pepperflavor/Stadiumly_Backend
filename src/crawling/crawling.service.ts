import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

const URL = 'https://www.koreabaseball.com/ws/Main.asmx/GetKboGameList';
// 선발투수 크롤링
@Injectable()
export class CrawlingService {
  // url에서 바로 json 받아오기, param이 고정이라는 가정하에
  async getStartPitcherWithURL() {
    const paramDate = this.getParamDate();
    console.log('크롤링 서비스 : ');
    console.log(paramDate);

    const payload = {
      leId: '1',
      srId: '0,1,3,4,5,6,7,8,9',
      date: paramDate,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(URL, qs.stringify(payload), {
        headers,
      });

      console.log('json 받아오기 성공? : ');
      console.log(response);
    } catch (error) {
      console.error('크롤링 에러남 :', error);
      return null;
    }
  }

  // 그날그날 날짜
  getParamDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
}
