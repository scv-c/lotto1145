export default function LottoCircle({ lottoList }) {
  console.log(`Lotto번호추출되었슈`);
  const lottoDomList = lottoList.map((e) => {
    let curColorNum = Math.floor(e.number / 10);
    if (e.number % 10 != 0) {
      curColorNum += 1;
    }

    return (
      <li className={`lotto-ball-default lotto-ball-${curColorNum}`} key={e.id}>
        {e.number}
      </li>
    );
  });

  return <ul>{lottoDomList}</ul>;
}
