const header = document.getElementById('header')
const footer = document.getElementById('footer')
const qna = document.getElementById('qna')
const u_name = document.querySelector('input[type=text]')
const valid_temp = document.querySelector('#valid_temp')
const wrap = document.getElementById('wrap')
const tabletMQL = window.matchMedia('all and (min-width: 768px)')
const pcMQL = window.matchMedia('all and (min-width: 1024px)')
const ENDPOINT = 10
const select = []
const color = [
  [189, 252, 201],
  [0, 0, 0],
  [255, 255, 255],
  [255, 192, 203],
  [192, 192, 192],
  [128, 0, 128],
  [208, 112, 251],
  [255, 0, 0],
  [135, 206, 235],
  [255, 255, 0],
  [0, 128, 0],
  [174, 125, 153],
  [0, 0, 128],
  [255, 215, 0],
  [255, 149, 149],
  [128, 64, 0]
]
const color_id = [
  'mint',
  'black',
  'white',
  'pink',
  'silver',
  'purple',
  'lavenda',
  'red',
  'sky',
  'yellow',
  'green',
  'babypink',
  'navy',
  'gold',
  'coral',
  'brown'
]
let qIdx = -1

const goTo = (dest) => {
  let elem
  let elemTop
  if (dest === 'artist') {
    elem = document.getElementById('intro-box')
  } else {
    elem = document.getElementById('share-box')
  }
  elemTop = window.pageYOffset + elem.getBoundingClientRect().top
  if (pcMQL.matches) {
    elemTop -= 150
  } else if (tabletMQL.matches) {
    elemTop -= 115
  } else {
    elemTop -= 60
  }
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: elemTop
  })
}
const goArtist = () => goTo('artist')
const goShare = () => goTo('share')

const copy = () => {
  const tmp = document.createElement('textarea')
  document.body.appendChild(tmp)
  tmp.value = url
  tmp.select()
  document.execCommand('copy')
  document.body.removeChild(tmp)
}

const calcScore = () => {
  let red = 0
  let green = 0
  let blue = 0
  for (let i = 0; i < ENDPOINT; i++) {
    red += qnaList[i].a[select[i]].score[0] / 100
    green += qnaList[i].a[select[i]].score[1] / 100
    blue += qnaList[i].a[select[i]].score[2] / 100
    // console.log(point)
  }
  // let point = 0
  // for (let i = 0; i < ENDPOINT; i++) {
  //   point += qnaList[i].a[select[i]].score
  //   // console.log(point)
  // }
  console.log(red, green, blue)
  red *= 255
  green *= 255
  blue *= 255
  const point = [red, green, blue]
  // console.log(point)
  return point
}

const sortResult = (point) => {
  let num = 0
  let property = []
  for (let i = 0; i < color_id.length; i++) {
    let r = 0
    let g = 0
    let b = 0
    r = Math.sqrt(Math.pow(color[i][0] - point[0], 2))
    g = Math.sqrt(Math.pow(color[i][1] - point[1], 2))
    b = Math.sqrt(Math.pow(color[i][2] - point[2], 2))
    property.push(r + g + b)
  }
  let colorMin = Math.min(...property)
  // console.log(property, colorMin)
  for (let j = 0; j < property.length; j++) {
    if (property[j] === colorMin) {
      num = j
      break
    }
    // console.log(num)
  }
  // if (point <= 20) {
  //   num = 0
  // } else if (point <= 30) {
  //   num = 1
  // } else if (point <= 40) {
  //   num = 2
  // } else if (point <= 50) {
  //   num = 3
  // } else if (point <= 60) {
  //   num = 4
  // } else {
  //   num = 5
  // }
  let colorValue = color[num]
  console.log(colorValue);
  return [num, colorValue]
}

const goResult = () => {
  if (pcMQL.matches) {
    console.log('PC')
    wrap.style.marginTop = '150px'
  } else if (tabletMQL.matches) {
    console.log('tablet')
    wrap.style.marginTop = '115px'
  }

  const result = document.getElementById('result')
  const point = calcScore()
  const res_sort = sortResult(point)
  const grade = res_sort[0] 
  const colorvalue = res_sort[1]
  console.log(res_sort);
  const pTitle = document.querySelector('.p')
  const res_point = document.querySelector('.point')
  const colorvalue_input = document.querySelector('.colorvalue')
  // const pin = document.querySelector('.pin')
  const img_url = '../static/assets/img/image-' + grade + '.jpg'
  const res_img = document.createElement('img')
  colorvalue_input.value = colorvalue
  const res_img_div = document.querySelector('.art')
  const animal = document.querySelector('.result')
  const desc = document.querySelector('.res')

  pTitle.innerHTML = u_name.value + ' 님의 테스트 결과는...'
  res_point.value = point
  // console.log(res_point);
  // pin.style.marginLeft = infoList[grade].mLeft
  res_img.src = img_url
  res_img.alt = infoList[grade].name
  res_img.title = infoList[grade].name
  res_img_div.appendChild(res_img)
  res_img_div.style.width = '90%'
  res_img_div.style.height = '100%'
  animal.innerHTML = infoList[grade].name
  desc.innerHTML = infoList[grade].desc

  setTimeout(() => {
    header.style.display = 'block'
    footer.style.display = 'block'
    result.style.display = 'block'
    header.style.animation = 'fade-in 0.3s forwards'
    footer.style.animation = 'fade-in 0.3s forwards'
    result.style.animation = 'going-up 0.5s, ' + 'fade-in 0.5s forwards'
  }, 600)
}

const end = () => {
  qna.style.animation = ''
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1
    qna.style.transform = 'translateY(-1px)'
  }, 50)
  setTimeout(() => clearTimeout(interval), 500)
  setTimeout(() => (qna.style.display = 'none'), 500)
  setTimeout(() => {
    const calc = document.getElementById('calc')
    calc.style.display = 'block'
    calc.style.animation = 'going-up 0.5s forwards, ' + 'fade-in 0.5s forwards'
  }, 700)
  setTimeout(() => {
    calc.style.animation = ''
    calc.style.animation =
      'going-left 0.4s forwards, ' + 'fade-out 0.4s forwards'
    setTimeout(() => {
      calc.style.display = 'none'
      goResult()
    }, 400)
  }, 9000)
}

const addAnswer = (answerTxt, idx) => {
  const answer = document.createElement('button')
  const a = document.querySelector('.answer')
  answer.className += 'a box'
  answer.innerHTML = answerTxt
  answer.addEventListener('click', () => {
    const parent = answer.parentNode
    const children = parent.childNodes
    // console.log(children);
    for (let i in children) {
      children[i].disabled = true
    }
    parent.classList.add('fade-out-5-4')
    setTimeout(() => {
      select[qIdx] = idx
      a.innerHTML = ''
      parent.classList.remove('fade-out-5-4')
      goNext()
    }, 800)
  })

  setTimeout(
    () =>
      (answer.style.animation =
        'going-down 0.25s forwards, fade-in 0.25s forwards'),
    50
  )
  a.appendChild(answer)
}

const goNext = () => {
  if (qIdx++ === qnaList.length - 1) {
    end()
    return
  }
  // console.log(qnaList.length)
  const status = document.querySelector('.status')
  const qNum = qnaList[qIdx]
  const q = document.querySelector('.q')

  status.style.width = ENDPOINT * (qIdx + 1) + '%'
  q.innerHTML = qNum.q
  qna.style.animation =
    'fade-in 0.3s ease-in-out 0.4s forwards, ' +
    'going-down 0.3s ease-in-out 0.4s forwards'

  setTimeout(() => {
    const endIdx = qNum.a.length - 1
    // console.log(endIdx)
    for (let i in qNum.a) {
      // console.log(qNum.a[i].answer)
      addAnswer(qNum.a[i].answer, i)
    }
    qna.style.opacity = 1
  }, 700)
}

const begin = () => {
  const welcome = document.getElementById('welcome')
  header.style.animation = 'going-up 0.4s forwards, ' + 'fade-out 0.4s forwards'
  footer.style.animation =
    'going-down 0.4s forwards, ' + 'fade-out 0.4s forwards'
  setTimeout(
    () =>
      (welcome.style.animation =
        'going-up 0.4s ease-in-out forwards, ' +
        'fade-out 0.4s ease-in-out forwards'),
    500
  )
  setTimeout(() => {
    header.style.display = 'none'
    footer.style.display = 'none'
    welcome.style.display = 'none'
    qna.style.display = 'block'
    if (pcMQL.matches) {
      console.log('PC')
      wrap.style.marginTop = '50px'
    } else if (tabletMQL.matches) {
      console.log('tablet')
      wrap.style.marginTop = '30px'
    }
    goNext()
  }, 1000)
}

const load = () => {
  const msg = document.querySelector('.check-name')
  const start_btn = document.querySelector('.start')

  start_btn.addEventListener('blur', () => {
    try {
      if (u_name.value.length < 1) {
        throw '이름을 입력하고 시작해 주세요.'
      }
      msg.innerHTML = ''
    } catch (err) {
      msg.innerHTML = err
    }
  })

  start_btn.addEventListener('click', () => {
    try {
      if (u_name.value.length < 1) {
        start_btn.disabled = true
        throw '이름을 입력하고 시작해 주세요.'
      }
      msg.innerHTML = ''
      
      begin()
    } catch (err) {
      msg.innerHTML = err
    }
  })
}

window.onload = load()
