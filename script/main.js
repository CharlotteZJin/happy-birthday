// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          animationTimeline();
        } 
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  const playVideo = (videoId = 'my-video1', containerSelector = '.video-container1') => {
      return new Promise((resolve) => {
        const videoContainer = document.querySelector(containerSelector);
        const video = document.getElementById(videoId);
        
        if (!videoContainer || !video) {
          console.error('未找到视频容器或视频元素');
          setTimeout(resolve, 1000);
          return;
        }
        
        videoContainer.style.display = 'block';
    
        video.play().catch(error => {
          console.log("视频播放失败:", error);
          setTimeout(resolve, 1000);
        });
        
        video.addEventListener('ended', () => {
          videoContainer.style.display = 'none';
          resolve();
        }, { once: true }); // 使用 once: true 确保事件只触发一次
        
        // 可选：添加错误处理
        video.addEventListener('error', () => {
          console.error('视频加载错误');
          videoContainer.style.display = 'none';
          resolve();
        });
      });
    };

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".text-box", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .from(".gift-image1", 0.5, {
      scale: 0.2,
      opacity: 0
    }, "+=0.8")

    .to(".fake-btn", 0.1, {
      backgroundColor: "rgba(234, 212, 253, 1)"
    }, "+=0.3")
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgba(184, 147, 223, 1)"
    }, "+=0.3")

    .to(".gift-image1", 0.5, {
      scale: 0.2,
      opacity: 0
    })
    .from(".gift-image2", 0.5, {
      scale: 0.2,
      opacity: 0
    }, "-=0.2")
    

    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=2.0"
    )
    .from(".idea-0", 0.7, ideaTextTrans)
    .to(".idea-0", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgba(233, 184, 240, 1)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .call(() => {
      tl.pause();
      
      // 播放视频
      playVideo('my-video1', '.video-container1').then(() => {
        tl.resume();
      });
    })
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .call(() => {
      tl.pause();
      
      // 播放视频
      playVideo('my-video2', '.video-container2').then(() => {
        tl.resume();
      });
    })
    .staggerFrom(
      ".idea-7 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-7 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .call(() => {
      tl.pause();
      
      // 播放视频
      playVideo('my-video3', '.video-container3').then(() => {
        tl.resume();
      });
    })

    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "+=0"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#778cf4ff",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight img",
      5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 0
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .from(
      ".last-smile",
      0.5,
      {
        opacity: 0,
        y: 10
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Run fetch and animation in sequence
const startAnimation = () => {
  const startContainer = document.getElementById('start-container');
  startContainer.style.display = 'none';
  
  const audioElement = document.querySelector('audio');
  if (audioElement) {
    audioElement.play().catch(error => {
      console.log("自动播放被阻止:", error);
    });
    
    audioElement.volume = 0.7; 
    
    audioElement.loop = true;
  } else {
    console.log("未找到音频元素");
  }
  

  fetchData();
};

document.addEventListener('DOMContentLoaded', () => {
  const startContainer = document.getElementById('start-container');
  
  startContainer.addEventListener('click', startAnimation);

  document.addEventListener('keydown', (e) => {
    startAnimation();
  });
});