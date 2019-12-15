(function() {
  const elementsToUpdate = Array.from(document.getElementsByClassName('progress-value'));
  const bar = document.getElementById('progress-bar');

  // const getYearPercentage = () => {
  //   const now = new Date();
  //   const startOfYear
  // }

  const setPercentage = (percentage) => {
    const textToShow = percentage.toFixed(1) + '%';
    elementsToUpdate.forEach(element => {
      element.innerHTML = textToShow;
    });
    bar.style.width = percentage + '%';
  }

  const update = () => {
    const date = new Date();
    setPercentage((date.getTime()/1000) % 100);
  }

  setInterval(update, 100);
  update();
})()
