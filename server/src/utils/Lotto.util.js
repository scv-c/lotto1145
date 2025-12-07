import e from "cors";
import dayjs from "dayjs";

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
    const now = dayjs();
    return now.format("YYYY-MM-DD HH:mm");
  }

  /**
   * 현재시간에서 num분만큼 이전의 시간을 구함
   * @param {number} num
   * @returns
   */
  static getBeforeMinutesSeq(num) {
    const now = dayjs();
    return now.subtract(num, "m").format("YYYY-MM-DD HH:mm");
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

  /**
   * 유저의 특정 회차 로또정보와 현재 회차(결과)의 로또정보를 받아와 맞춘 횟수를 반환한다.
   * @param {object} dailyLotto No* 으로만 구성된 dailyLotto Object
   * @param {object} userLottoList No* 으로만 구성된 userLotto Object
   * @returns
   */
  static getAnsCount(dailyLotto, userLotto) {
    let count = 0;

    for (let [key, value] of Object.entries(userLotto)) {
      if (Object.values(dailyLotto).includes(value)) {
        count++;
      }
    }

    return count;
  }

  /**
   * 로또 정보들에서 중복을 제거 하며, AnsCount가 가장 높은 로또정보(MaxScore)만 반환
   * @param {object[]} userLottoLists
   * @returns object[]
   */
  static getDistinctMaxScoreLottoList(userLottoLists) {
    const maxScoreList = new Map();
    for (const userLottoList of userLottoLists) {
      const { UUID, AnsCount } = userLottoList;

      if (!maxScoreList.get(UUID) || maxScoreList.get(UUID) < AnsCount) {
        maxScoreList.set(UUID, AnsCount);
      }
    }

    return userLottoLists.filter((e) => maxScoreList.get(e.UUID));
  }

  /**
   * 업데이트할 내용 중, 현재 맞춘 수보다 작은 것들은 제거.
   * @param {object[]} userList
   * @param {object[]} userLottoLists
   * @returns
   */
  static getUserListsNeedUpdateMaxScore(userList, userLottoLists) {
    const updateList = [];

    for (const userLottoList of userLottoLists) {
      const { UUID, AnsCount } = userLottoList;
      const user = userList.find((e) => e.UUID == UUID);

      if (user.MaxScore < AnsCount) {
        console.log(
          `최대점수 비교 ${UUID} | AnsCount : ${AnsCount} | MaxScore : ${user.MaxScore}`
        );
        updateList.push(userLottoList);
      }
    }

    return updateList;
  }

  //가장 많이 맞춘 사람 목록 가져오기.
  static getHighScoreUserInCurrentSeq(userLottoLists) {
    let highScore = 0;
    let users = [];

    userLottoLists.map((userLottoList) => {
      if (highScore > userLottoList.AnsCount) return;

      if (highScore == userLottoList.AnsCount) {
        users.push(userLottoList);
      } else {
        highScore = userLottoList.AnsCount;
        users = [userLottoList];
      }
    });

    return users;
  }
}
