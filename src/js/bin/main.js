// import JustValidate from 'just-validate';


/* const formsToValidate = document.querySelectorAll('.form');
  formsToValidate.forEach(item => {
    new JustValidate(item, {
      errorFieldCssClass: 'is-invalid',
      errorLabelStyle: {
        // display:'inline-block',
        // fontSize: '13px',  
        // color: 'white',
        // padding: '4px 8px',
        // background: '#423f3f',
        // 'border-radius': '7px',
        // 'margin-bottom':'4px',
        // transform: 'translateY(-5px)'
      },
      focusInvalidField: true,
      lockForm: true,
      // tooltip: {
      //   position: 'top'
      // }
    }).addField('[name=user_name]', [
      {
        rule: 'required',
        errorMessage: 'Пожалуйста, введите имя'
      }
    ]).addField('[name=user_phone]', [
      {
        rule: 'customRegexp',
        value: /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/,
        errorMessage: 'Пожалуйста, завершите ввод номера телефона'
      },
      {
        rule: 'required',
        errorMessage: 'Пожалуйста, введите номер телефона'
      }
    ])
  
      .onSuccess(() => {
        item.setAttribute('data-valid', '');
      }).onFail(() => {
        item.removeAttribute('data-valid', '');
      });
  }); */