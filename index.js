$(document).ready(function () {
  //scroll effects
  //find elements to animate once
  const toFade = $('.fadein');

  const duration = 1000;
  const threshold = 200;
  const queueDelay = 300;

  //show them if needed
  fade();

  //listen to scroll events
  $(window).scroll(function () {
    fade();
  });

  // check if the element is on screen and fade it in
  function fade() {
    toFade.each(function (i) {
      let windowBottom = $(window).scrollTop() + $(window).height();
      let elementTop = $(this).offset().top;

      //if element is away from viewport stop all animation and reset it's opacity
      if (windowBottom < elementTop) {
        $(this).stop(true, true);
        $(this).css('opacity', 0);
        return;
      }

      //if it's currently animated don't do anithing
      if ($(this).is(':animated')) return;

      //if it's visible for $threshold pixels from the bottom of a viewport show it
      if (windowBottom > elementTop + threshold) {

        //if it should be animated after it's previous sibling delay animation
        if ($(this).hasClass('fade-in-queue') && $(window).width() > 768) {
          setTimeout(() => $(this).animate({ 'opacity': '1' }, duration), queueDelay * $(this).index());
        } else {
          $(this).animate({ 'opacity': '1' }, duration);
        }
      }
    });
  }

  //form validation
  $('#contactForm').on('submit', (e) => {
    e.preventDefault();
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;

    //hide errors from previous attempt
    $('.error').hide();

    //validate fields
    const nameValid = validate('input#name', (val) => val !== '');
    const emailValid = validate('input#email', (val) => val !== '' && emailRegex.test(val));
    const textValid = validate('textarea#text', (val) => val !== '');

    //if all is ok send form
    if (nameValid && emailValid && textValid) {
      $('.sent').show();
    }
  })

  // validates element with rule function shows error if validation fails
  function validate (selector, rule) {
    const el = $(selector);
    if (rule(el.val())) {
      return true;
    } else {
      el.siblings('.error').show();
      return false;
    }
  }
});