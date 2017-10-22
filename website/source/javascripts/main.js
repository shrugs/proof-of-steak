/* eslint-disable max-len */

// importing jquery like i give a fuck
import $ from 'jquery'

import 'particles.js/particles.js'
import particlesConfig from '../assets/particlesjs-config.json'
import Chart from 'chart.js'

setTimeout(() => {
  particlesJS('hero', particlesConfig)
}, 5000)

// eslint-disable-next-line no-new
new Chart(document.getElementById('ics-distribution'), {
  type: 'pie',
  data: {
    labels: ['The Ethereum Foundation', 'The TrueBit Establishment', 'The Steak Network Bounty'],
    datasets: [{
      borderColor: '#f4f1de',
      backgroundColor: ['#ab544b', '#ad4d43', '#b3665d'],
      data: [10, 70, 20],
    }],
  },
  options: {
    animation: false,
    legend: {
      position: 'bottom',
      onClick: (e) => e.stopPropagation(),
    },
    tooltips: {
      callbacks: {
        label: (tt, data) => {
          return `${data.datasets[tt.datasetIndex].data[tt.index]}% ${data.labels[tt.index]}`
        },
      },
    },
  },
})

const doNyan = (cat) => {
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

const doSparks = ($container, $combo) => {
  const yCombosAmount = Math.ceil($container.height() / $combo.height())
  for (var a = 0; a < yCombosAmount - 1; a += 1) {
    const newCombo = $combo.clone()
    $combo.parent().prepend(newCombo)
  }
}

$('.easter-egg').on('click', () => {
  const $outer = $('.egg-container-container-container')
  const $container = $('.egg-container')
  $outer.show()

  document.getElementById('audio').play()

  doNyan($('#nyan-cat'))
  doSparks($container, $('.sparks-combo'))

  setTimeout(() => {
    $outer.append('<h2 class="lol">No, you can\'t stop this.</h2>')
  }, 10000)
})

console.log(`




                                                                                                                                                                 ;
                                                                                                                                                               '.
                                                                                                                                                             .#\`
                                                                                                                                                            +#
                                                                                                                                                          \`##
                                                                                                                                                         '##
                                                                                                                                                        ###
                                                                                                                                                      \`###
                                                                                                                                                     :###
                                                                                                                                                    '###
           We're building some dope projects at TrueBit;                                                                                           +###
              come hang out in slack and get involved :)                                                                                          ####
                                                                                                                                                 ####\`
                                                                                                                                                ####,
                                                                                                                                               ####'
                                                                                                                                              #####
                                                                                                                                             #####
                                                                                                                                            #####
                                                                                                                                           #####:
                                                                                                                                          +####+
                                                                                                                           :.            '#####
                                                                                                                            ;#.         :#####.
                                                                                                                             ;##.      \`#####+
                                                                                                                              '###.    ######
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                       @@@@@@@@@@@@@@@@@;       '####\` ######\`
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@;                                                                       +@@@@@@@@@@@@@@@@@@@.     +##########+
 @@@@++++++++@@@@@+++++++++@@@\`                                                                          @@@@@     .#@@@@@@#     +#########
 @@@.        @@@@@         @@@                                                                           @@@@@        #@@@@@#     +#######:
 @@@         @@@@@         @@@                                                                           +@@@@         #@@@@@      #######
 @@@         @@@@@         @@@                                                                           +@@@@          @@@@@#      #####\`             :
 @@.         @@@@@         :@#                                                                           +@@@@          @@@@@@       ####            @@@
 +@          @@@@@          @,                                                                           +@@@@          +@@@@@        ##             @@@
 ;@          @@@@@          @                                                                            +@@@@          :@@@@@         '            +@@@
             @@@@@                                                                                       +@@@@          ;@@@@@                      @@@@
             @@@@@                                                                                       +@@@@          @@@@@;                      @@@@
             @@@@@                 .#.     :@@        ;@             ;@              ,@@@@@,             +@@@@          @@@@@           .#:        ,@@@@
             @@@@@             ;@@@@@.  ;@@@@@   ,@@@@@@        ,@@@@@@            @@@@@@@@@@#           +@@@@         .@@@@+       ;@@@@@,     @@@@@@@@@@@@@@@
             @@@@@           ;@@@@@@@.:@@@@@@@  @@@@@@@@       @@@@@@@@          ;@@@@.   #@@@@          +@@@@         @@@@@      +@@@@@@@.     @@@@@@@@@@@@@@@
             @@@@@              +@@@@@@@+@@@@@    ;@@@@@         ;@@@@@         +@@@#      ;@@@@         +@@@@       ,@@@@'         \`#@@@@.        @@@@@:::::::
             @@@@@               @@@@@    +@@+     @@@@@          @@@@@        .@@@@        @@@@;        +@@@@+++++@@@@@#             @@@@.        @@@@@
             @@@@@               @@@@.     @@.     @@@@@          @@@@@        @@@@\`        @@@@@        +@@@@@@@@@@@@@@@'            @@@@         @@@@@
             @@@@@               @@@@.     #@      @@@@@          @@@@@       +@@@@         :@@@@        +@@@@.....'@@@@@@@#          @@@@         @@@@@
             @@@@@               @@@@.      @      @@@@@          @@@@@       @@@@#         .@@@@;       +@@@@        .@@@@@@         @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@       @@@@:         .@@@@@       +@@@@          @@@@@@        @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      ;@@@@@@@@@@@@@@@@@@@@       +@@@@           @@@@@,       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      @@@@@@@@@@@@@@@@@@@@@       +@@@@           @@@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      @@@@@                       +@@@@           .@@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      @@@@@                       +@@@@            @@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      @@@@@.                      +@@@@            @@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      @@@@@+                      +@@@@            @@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@      :@@@@@                      +@@@@            @@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@       @@@@@                      +@@@@           ;@@@@@       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@          @@@@@       @@@@@@                     +@@@@           @@@@@.       @@@@         @@@@@
             @@@@@               @@@@.             @@@@@\`         @@@@@       .@@@@@;                    +@@@@          .@@@@@        @@@@         @@@@@
             @@@@@               @@@@.             ,@@@@@         @@@@@        @@@@@@#                   +@@@@          @@@@@         @@@@         @@@@@
             @@@@@               @@@@,              @@@@@@:    \`#@@@@@@         @@@@@@@@,        \`       @@@@@        ;@@@@@          @@@@.        @@@@@@
           ,@@@@@@@;            +@@@@@,             ,@@@@@@@@@@@@@;@@@@@         @@@@@@@@@@@@@@@@+      ;@@@@@@+:::+@@@@@@#          #@@@@@        .@@@@@@@@@@@@
         @@@@@@@@@@@@@       +@@@@@@@@@@@            :@@@@@@@@@@:  @@@@@@@        ,@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@'         @@@@@@@@@@@@      @@@@@@@@@@:
         :...........,\`      \`...........\`             '@@@@@@.     @@@@,           \`#@@@@@@@,        .........:::::.             ............       .@@@@@;
`)
