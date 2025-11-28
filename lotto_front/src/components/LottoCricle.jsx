export default function LottoCircle({ lottoList }) {
  const lottoDomList = [];

  for (const [key, value] of Object.entries(lottoList)) {
    const numValue = Number(value);

    let curColorNum = Math.floor(numValue / 10);
    if (numValue % 10 != 0) {
      curColorNum += 1;
    }

    lottoDomList.push(
      <li className={`lotto-ball-default lotto-ball-${curColorNum}`} key={key}>
        {numValue}
      </li>
    );
  }
  
  return <ul>{lottoDomList}</ul>;
}
