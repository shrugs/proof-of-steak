import $ from 'jquery'

export const doNyan = (cat) => {
  const framesAmount = 4
  let currentFrame = 1

  const cycleIds = (_currId) => {
    if (_currId >= framesAmount) {
      _currId = 1
    } else {
      _currId += 1
    }

    return _currId
  }

  const cycleFrames = () => {
    cat.removeClass('frame' + currentFrame).addClass('frame' + cycleIds(currentFrame))
    currentFrame = cycleIds(currentFrame)
  }

  setInterval(() => {
    cycleFrames()
  }, 500)
}

export const doSparks = ($container, $combo) => {
  const yCombosAmount = Math.ceil($container.height() / $combo.height())
  for (var a = 0; a < yCombosAmount - 1; a += 1) {
    const newCombo = $combo.clone()
    $($combo.parent()).prepend(newCombo)
  }
}
