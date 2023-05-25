function init() {
	var imgDefer = document.getElementsByTagName('img');
	for (var i=0; i<imgDefer.length; i++) {
		if (imgDefer[i].getAttribute('src') !== "./multimedia/docs.png") {
			if(imgDefer[i].getAttribute('data-src')) {
				imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
			}
		}
	}
}
window.onload = init;

$(document).ready(function() {

	var windowWidth = $(window).outerWidth();

	$(".services__wrapper__section__slideshow__item:gt(0)").hide();

	setInterval(function() {
		$(".services__wrapper__section__slideshow__item").eq(0)
			.fadeOut(1000)
			.next()
			.fadeIn(1000)
			.end()
			.appendTo(".services__wrapper__section__slideshow");
	}, 7000);

	$(".map__wrapper__overlay").click(function() {
		$(".map__wrapper__overlay").addClass("map__wrapper__overlay--disabled");
	});

	$(".map__wrapper").on("mouseleave", function() {
		$(".map__wrapper__overlay").removeClass("map__wrapper__overlay--disabled");
	});

	$("#nameTxt, #emailTxt, #phoneTxt, #subjectTxt, #messageTxt").on("click keyup", function() {
		$(this).removeAttr("style");
		var inputLabel = $("#" + $(this)[0].id.replace("Txt", "Lbl"));
		var warningLabel = $("#" + $(this)[0].id.replace("Txt", "WarnLbl"));
		if ($(this).val().length == 0) {
			inputLabel.removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			inputLabel.removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
		} else {
			inputLabel.addClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			inputLabel.addClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
			warningLabel.removeClass("contact__wrapper__container__form__fieldset__form-field__warning-label--visible");
		}
	});

	$("#nameTxt, #emailTxt, #phoneTxt, #subjectTxt, #messageTxt").on("focusout", function() {
		var inputLabel = $("#" + $(this)[0].id.replace("Txt", "Lbl"));
		var warningLabel = $("#" + $(this)[0].id.replace("Txt", "WarnLbl"));
		inputLabel.removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
		warningLabel.removeClass("contact__wrapper__container__form__fieldset__form-field__warning-label--visible");
	});

	$(".main-header__lower-header ul li a").on("click tap", function(e) {

		$(".main-header__lower-header ul li a").removeClass("border-active");

		$(this).addClass("border-active");

	});

	$(".main-header__lower-header__menu-button").on("click tap", function(e) {
		
		e.stopPropagation();

		$("body").toggleClass("pointer");
		$(".main-header__lower-header").toggleClass("expand");
		$(".main-header__lower-header__menu-button__hamburger").toggleClass("active");
		$(".main-header__lower-header ul").toggleClass("visible");

	});

	$(document).on("click tap", function(e) {

		e.stopPropagation();

		if ($(e.target).closest(".main-header__lower-header").length == 0 || $(e.target).is(".main-header__lower-header ul li a")) {
			$("body").removeClass("pointer");
			$(".main-header__lower-header").removeClass("expand");
			$(".main-header__lower-header__menu-button__hamburger--cancel").removeClass("active");
			$(".main-header__lower-header ul").removeClass("visible");
		}

	});

	var middleHeader = $(".main-header__middle-header");
	var initMiddleHeaderHeight;
	var minHeaderHeight = 80;

	var currentScroll = $(window).scrollTop();;
	var currentHeaderHeight;

	if ($(window).outerWidth() < rem(70)) {
		$(".banner").height($(window).height() - 125);
	} else {
		$(".banner").removeAttr("style");
	}

	if (currentScroll > 1000) {
		$(".map__wrapper iframe").attr("src", 'https://www.google.com/maps/embed/v1/place?q=Tannadi&key=AIzaSyCi_fH9hmXdgOJ6SP0XkFlB0ufOvygmt4w');
	}

	assignSessionVariables();

	selectScrollMenu();

	function assignSessionVariables() {

		if ($(window).outerWidth() > rem(70)) {
			headerOffsetTop = 30;
		} else {
			headerOffsetTop = 0;
		}

		if ($(window).outerWidth() > rem(70)) {
			initMiddleHeaderHeight = 120;
		} else {
			initMiddleHeaderHeight = minHeaderHeight;
		}

		if (currentScroll > headerOffsetTop) {
			currentHeaderHeight = initMiddleHeaderHeight + headerOffsetTop - currentScroll;
			if (currentHeaderHeight > minHeaderHeight) {
				middleHeader.outerHeight(currentHeaderHeight);
			} else {
				middleHeader.outerHeight(minHeaderHeight);
			}
			$(".main-header").addClass("fix-on-top");
		} else {
			middleHeader.outerHeight(initMiddleHeaderHeight);
			$(".main-header").removeClass("fix-on-top");
		}

	}

	function respondToScroll() {

		currentScroll = $(window).scrollTop();
		sessionStorage.setItem("currentScroll", currentScroll);

		if (currentScroll > headerOffsetTop) {
			currentHeaderHeight = initMiddleHeaderHeight + headerOffsetTop - currentScroll;
			if (currentHeaderHeight > minHeaderHeight) {
				middleHeader.outerHeight(currentHeaderHeight);
			} else {
				middleHeader.outerHeight(minHeaderHeight);
			}
			$(".main-header").addClass("fix-on-top");
		} else {
			middleHeader.outerHeight(initMiddleHeaderHeight);
			$(".main-header").removeClass("fix-on-top");
		}
		sessionStorage.setItem("currentHeaderHeight", currentHeaderHeight);

	}

	function selectScrollMenu() {

		$(".main-header__lower-header ul li a").removeClass("border-active");

		if ($(window).scrollTop() < $("section").eq(2).offset().top - $(".main-header").outerHeight()) {
			$(".main-header__lower-header ul li a").eq(0).addClass("border-active");
		} else if ($(window).scrollTop() < $("section").eq(3).offset().top - $(".main-header").outerHeight()) {
			$(".main-header__lower-header ul li a").eq(1).addClass("border-active");
		} else if ($(window).scrollTop() < $("section").eq(4).offset().top - $(".main-header").outerHeight()) {
			$(".main-header__lower-header ul li a").eq(2).addClass("border-active");
		} else if ($(window).scrollTop() < $("section").eq(5).offset().top - $(".main-header").outerHeight()) {
			$(".main-header__lower-header ul li a").eq(3).addClass("border-active");
		} else {
			$(".main-header__lower-header ul li a").eq(4).addClass("border-active");
		}

	}

	$(window).scroll(function(e) {

		if ($(window).scrollTop() > 1000) {
			$(".map__wrapper iframe").attr("src", 'https://www.google.com/maps/embed/v1/place?q=Tannadi&key=AIzaSyCi_fH9hmXdgOJ6SP0XkFlB0ufOvygmt4w');
			$(this).off(e);
		}

	});

	$(window).scroll(function() {

		selectScrollMenu();

		if ($(window).outerWidth() > rem(70)) {
			respondToScroll();
		}

	});

	$(window).resize(function() {

		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			if (windowWidth != Math.floor($(window).outerWidth())) {
				$(".map__wrapper").show(0, function(){         
					$("iframe",this).attr("src","https://www.google.com/maps/embed/v1/place?q=Tannadi&key=AIzaSyCi_fH9hmXdgOJ6SP0XkFlB0ufOvygmt4w");
				});
				windowWidth = $(window).outerWidth();
			}
		}, 250);

		if (windowWidth != Math.floor($(window).outerWidth())) {
			$("body").removeClass("pointer");
			$(".main-header__lower-header").removeClass("expand");
			$(".main-header__lower-header__menu-button__hamburger--cancel").removeClass("active");
			$(".main-header__lower-header ul").removeClass("visible");
		}

		if ($(window).outerWidth() < rem(70) || $(window).outerWidth() < rem(46)) {
			$(".banner").height($(window).height() - 125);
		} else {
			$(".banner").removeAttr("style");
		}

		assignSessionVariables();
		
		middleHeader.removeAttr("style");

		if ($(window).outerWidth() > rem(70)) {
			assignSessionVariables();
			respondToScroll();
		}

	});

});

function rem(input) {

	var emSize = parseFloat($("html").css("font-size"));

	return (emSize * input);

}

$(function() {

	$('a[href*="#"]:not([href="#"])').click(function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				if (target[0].id === "page-top") {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1200);
				} else if (target[0].id === "contact-form") {
					if ($(window).outerWidth() <= rem(70)) {
						if ($(window).outerWidth() <= rem(46)) {
							$('html, body').animate({
								scrollTop: target.offset().top
							}, 1200);
						} else {
							$('html, body').animate({
								scrollTop: target.offset().top - 140
							}, 1200);
						}
					} else {
						$('html, body').animate({
							scrollTop: target.offset().top - 343
						}, 1200);
					}
				} else {
					if ($(window).outerWidth() <= rem(70)) {
						if ($(window).outerWidth() <= rem(46)) {
							$('html, body').animate({
								scrollTop: target.offset().top - 280
							}, 1200);
						} else {
							$('html, body').animate({
								scrollTop: target.offset().top - 175
							}, 1200);
						}
					} else {
						$('html, body').animate({
							scrollTop: target.offset().top - 225
						}, 1200);
					}
				}
				$("body").removeClass("pointer");
				$(".main-header__lower-header").removeClass("expand");
				$(".main-header__lower-header__menu-button__hamburger--cancel").removeClass("active");
				$(".main-header__lower-header ul").removeClass("visible");
				return false;
			}
		}

	});

});

function checkInput(input) {

	var check = false;

	if (input.id == "nameTxt") {
		if (input.value.length !== 0) {
			check = true;
			$("#nameTxt").css({"border-color":"green"});
		} else {
			$("#nameTxt").css({"border-color":"red"});
			$("#nameWarnLbl").addClass("contact__wrapper__container__form__fieldset__form-field__warning-label--visible");
		}
	}

	if (input.id == "subjectTxt") {
		check = true;
		if (input.value.length !== 0) {
			$("#subjectTxt").css({"border-color":"green"});
		} else {
			$("#subjectTxt").removeAttr("style");
			$("#subjectLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			$("#subjectLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
		}
	}

	if (input.id == "emailTxt") {
		var emailRE = /^.+@.+\..{2,4}$/;
		if (input.value.match(emailRE)) {
			check = true;
			$("#emailTxt").css({"border-color":"green"});
		} else {
			$("#emailTxt").css({"border-color":"red"});
			$("#emailLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			$("#emailLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
			$("#emailWarnLbl").addClass("contact__wrapper__container__form__fieldset__form-field__warning-label--visible");
		}
	}

	if (input.id == "messageTxt") {
		if (input.value.length !== 0) {
			check = true;
			$("#messageTxt").css({"border-color":"green"});
		} else {
			$("#messageTxt").css({"border-color":"red"});
			$("#messageLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			$("#messageLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
			$("#messageWarnLbl").addClass("contact__wrapper__container__form__fieldset__form-field__warning-label--visible");
		}
	}

	if (input.id == "phoneTxt") {
		var phoneRE = /^\d+$/;
		if (input.value.length !== 0) {
			if (input.value.match(phoneRE)) {
				check = true;
				$("#phoneTxt").css({"border-color":"green"});
			} else {
				$("#phoneTxt").css({"border-color":"red"});
			}
		} else {
			check = true;
			$("#subjectTxt").removeAttr("style");
			$("#phoneLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
			$("#phoneLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
		}
	}

	return check;

}

//Replaced previous function sendMail()
function inputIsCompleteAndCorrect() {

  var inputOk = false;

  var formErrors = new Array(5);

  formErrors[0] = checkInput($("#nameTxt")[0]);
  formErrors[1] = checkInput($("#emailTxt")[0]);
  formErrors[2] = checkInput($("#messageTxt")[0]);
  formErrors[3] = checkInput($("#subjectTxt")[0]);
  formErrors[4] = checkInput($("#phoneTxt")[0]);

  if (formErrors.indexOf(false) === -1) {
    $("#nameTxt, #emailTxt, #phoneTxt, #subjectTxt, #messageTxt").removeAttr("style");
    $(".contact__wrapper__container__form__captcha").addClass("visible");
    inputOk = true;
  } else {
    alert("Vennligst kontroller alle feltene.");
  }

  return inputOk;
}

function submitToAPI(e) {  
          
  e.preventDefault();

  //Check input
  if (inputIsCompleteAndCorrect()) {        

    var name = document.getElementById("nameTxt").value;
    var email = document.getElementById("emailTxt").value; 
    var phone = document.getElementById("phoneTxt").value;
    var subject = document.getElementById("subjectTxt").value;
    var message = document.getElementById("messageTxt").value; 
           
    // Replaces previous function recaptchaCallback()
    $(".contact__wrapper__container__form__captcha").removeClass("visible");

    var data = {
      name : name,
      email : email,   
      phone : phone,
      subject: subject,
      message : message
    };

    var xmlhttp = new XMLHttpRequest(); 
    xmlhttp.open("POST", "https://cpbqugeuvb.execute-api.eu-north-1.amazonaws.com/sendmail");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200 ) {  
            $("#nameLbl, #emailLbl, #phoneLbl, #subjectLbl, #messageLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--position");
            $("#nameLbl, #emailLbl, #phoneLbl, #subjectLbl, #messageLbl").removeClass("contact__wrapper__container__form__fieldset__form-field__input-label--color");
            $(".contact__wrapper__container__form")[0].reset();
            $(".contact__wrapper__container__form input, .contact__wrapper__container__form textarea").focus().blur();
            alert("Takk for din henvendelse!");
            document.getElementById('contact-form').reset();
        } else {
            alert("Det oppstod en feil. Prøv igjen senere.");
        }
      }
    }
  }       
}