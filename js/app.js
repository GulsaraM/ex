const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

console.log(tabs);
console.log(tabsParent);
console.log(tabContent);

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};

const showTabContent = (i  = 0) => {
  tabContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};

hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
      if (target === item) {
        console.log(i);
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

let slideIndex = 0;

function autoSlider() {
  slideIndex++
  if (slideIndex >= tabs.length) {
    slideIndex = 0
  }
  hideTabContent();
  showTabContent(slideIndex);
}

tabsParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
      if (target === item) {
        slideIndex = i;
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});


setInterval(autoSlider, 2000);

const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector(".btn_white");
const closeModalBtn = document.querySelector(".modal__close");

console.log(modal, "modal");
console.log(modalTrigger, " modalTrigger");
console.log(closeModalBtn, " closeModalBtn");

const openModal = () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

modalTrigger.addEventListener("click", openModal);

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
    console.log(event.target);
  }
});

function openModalScroll() {
  const page = document.documentElement;

  if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
    openModal();

    window.removeEventListener("scroll", openModalScroll);
  }
}

window.addEventListener("scroll", openModalScroll)

closeModalBtn.addEventListener("click", closeModal);

const forms = document.querySelectorAll("form");

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
    },
    body: data,
  });
    return res;
};
// const message = {
//   loading: "Загрузка",
//   success: "успех",
//   fail: "ошибка",
// };

const bindPostData = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

//     const messageBlock = document.createElement("div");
//     messageBlock.textContent = message.loading;
//     form.append(messageBlock);
//
//     const request = new XMLHttpRequest();
//     request.open("POST", "server.php");
//     request.setRequestHeader("Content-type", "application/json");
//
    const formData = new FormData(form);
    const obj = {};

    formData.forEach((item, i) => {
      obj[i] = item;
    });
//
//     const json = JSON.stringify(obj);
//
//     request.send(json);
//
//     request.addEventListener("load", () => {
//       if (request.status === 200) {
//         console.log(request.response);
//         messageBlock.textContent = message.success;
//       } else {
//         messageBlock.textContent = message.fail;
//       }
//     });
    postData("server.php", JSON.stringify(obj))
        .then((data) => {
          console.log(data)
          window.alert("Success")
        })
        .catch(() => {
          console.log("error")
          window.alert("Error")
        })
        .finally(() => {
          console.log("ok")
          window.alert("OK")
        })
  });
};

forms.forEach((item) => {
  bindPostData(item);
});