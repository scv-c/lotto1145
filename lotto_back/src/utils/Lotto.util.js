/**
 * @class Lotto게임과 관련된 Util들 입니다.
 */
export class LottoUtil {
  /**
   * 1~45사이의 중복되지 않는 숫자 생성
   * @returns {number[]}
   */
  static getNewLottoNumbers() {
    const numbers = new Set();

    while (numbers.size < 7) {
      const randNum = Math.floor(Math.random() * 45) + 1;
      numbers.add(randNum);
    }

    return Array.from(numbers);
  }

  /**
   * 현재 시간을 HH:mm 형식으로 반환
   * @returns {string} YYYY-MM-DD HH:mm 형식의 시간
   */
  static getCurrentSeq() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = now.getMonth() + 1;
    const DD = now.getDate();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${YYYY}-${MM}-${DD} ${hours}:${minutes}`;
  }

  /**
   * 맞춘 갯수를 응답합니다.
   * @param {number} ans
   * @param {number} nums
   * @returns
   */
  static getAnswerPercentage(ans, nums) {
    let per = 0;
    
    for (let num of nums) {
      if (ans.includes(num)) per += 1;
    }

    return per;
  }
}
