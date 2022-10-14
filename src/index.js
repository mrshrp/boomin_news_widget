(function ($) {
  let data = {
    mainContainer: null,
    newsItemsControl: [],
  };

  let settings = {
    debug: false,
    url: 'https://boomin.ru/widget/publication',
    token: '',
    detailUrl: '',
    hideMetka: '.typ_none',
    newsItem: '.widget-news_item',
    newsBtn: '.widget-news_btn',
    targetLink: '_blank',
    controls: {
      imgContainer: {
        name: '.widget-news_item_img',
        data_value: ['picture'],
        create: function (newsLink, imgLink) {
          return $('<a>', {
            href: newsLink,
            target: settings.targetLink,
            class: 'block__img-link',
          }).append(
            $('<img>', {
              src: imgLink,
            })
          );
        },
      },
      titleContainer: {
        name: '.widget-news_item_title',
        data_value: 'title',
        create: function (newsLink, text) {
          return $('<a>', {
            href: newsLink,
            text: text,
            target: settings.targetLink,
            class: 'block__title-link',
          });
        },
      },
      textContainer: {
        name: '.widget-news_item_preview',
        data_value: 'text',
        create: function (newsLink, text) {
          return $('<div>', {
            class: 'block__text',
            html: text,
          });
        },
      },
    },
  };

  let mainMethods = {
    getFetchData: function () {
      //##########//
      fetch(mainMethods.createURL())
        .then(function (response) {
          if (response.status !== 200) {
            mainMethods.showLog(
              `Looks like there was a problem. Status Code: ${response.status}`
            );
            return;
          }
          response.json().then(function (_data) {
            //Заполняем данные!!!!!
            mainMethods.showLog('Данные сервера:', _data);
            if (_data.code == '5') {
              data.mainContainer.show();
              data.mainContainer.html(_data.message);
              console.error('Сервер вернул ошибку:', _data.message);
              mainMethods.showLog('Основной контейнер:', data.mainContainer);
            } else {
              settings.detailUrl = _data.detailUrl;
              mainMethods.loadData(_data.data);
              mainMethods.bindNewsButton();
            }
          });
        })
        .catch(function (e) {
          mainMethods.showLog(e);
        });
    },
    showLog: function (...arg) {
      if (!settings.debug) return;
      console.log(...arg);
    },
    initComponents: function () {
      //Функция поиска компонентов
      $.each(
        data.mainContainer.find(settings.newsItem),
        function (indexInArray, valueOfElement) {
          let elem = { container: valueOfElement };
          $(valueOfElement).attr('data-id', indexInArray);
          Object.keys(settings.controls).map(function (objectKey, index) {
            let value = settings.controls[objectKey].name;
            elem[objectKey] = {
              container: mainMethods.getContainer(elem.container, value),
              data_value: settings.controls[objectKey].data_value,
            };
          });
          data.newsItemsControl[indexInArray] = elem;
        }
      );
    },
    getContainer: function (mainEl, containerName) {
      return $(mainEl).find(containerName);
    },
    loadData: function (resData) {
      //Проверяем Данные Если нет то скрываем блок...
      if (resData.length === 0) {
        mainMethods.hideMetka();
        return true;
      }
      data.mainContainer.show();
      $.each(data.newsItemsControl, function (indexInArray, valueOfElement) {
        let mainCont = valueOfElement.container;

        if (resData[indexInArray]) {
          Object.keys(valueOfElement).map(function (objectKey, index) {
            if (objectKey !== 'container') {
              let elem = valueOfElement[objectKey].container;
              let data_key = valueOfElement[objectKey].data_value;
              if ($.isArray(data_key)) {
                //Это массив проверяем по параметрам где не null тогда передаем значение
                data_key.forEach((elKey) => {
                  let val = resData[indexInArray][elKey];
                  if (val !== '' && val !== null && val !== undefined) {
                    elem.html(
                      settings.controls[objectKey].create(
                        resData[indexInArray].link,
                        val
                      )
                    );
                  }
                });
              } else {
                elem.html(
                  settings.controls[objectKey].create(
                    resData[indexInArray].link,
                    resData[indexInArray][data_key]
                  )
                );
              }
            }
          });
        } else {
          $(mainCont).hide();
        }
      });
    },
    hideMetka: function () {
      if ($.isArray(settings.hideMetka)) {
        settings.hideMetka.forEach((elem) => {
          $(elem).each((i, el) => {
            $(el).hide();
            mainMethods.showLog('Скрыт блок:', el);
          });
        });
        //Перебираем массив
      } else {
        $(settings.hideMetka).each((i, el) => {
          $(el).hide();
          mainMethods.showLog('Скрыт блок:', el);
        });
      }
    },
    createURL: (type = false) => {
      if (!type) {
        return `${settings.url}/${settings.token}/`;
      } else {
        return settings.detailUrl;
      }
    },
    bindNewsButton: function () {
      $(settings.newsBtn).each((i, el) => {
        let $el = $(el);
        if ($el.prop('tagName') === 'A') {
          $el.attr('href', mainMethods.createURL(true));
          $el.attr('target', settings.targetLink);
        } else {
          $el.on('click', function (e) {
            e.preventDefault();
            mainMethods.showLog('Нажата кнопка подробней');
            window.open(mainMethods.createURL(true), settings.targetLink);
          });
        }
      });
    },
  };

  let methods = {
    init: function (options) {
      if (typeof options === 'object' || !options) {
        $.extend(settings, options); // конфигурации
      }

      data.mainContainer = $(this);
      data.mainContainer.hide();
      mainMethods.initComponents();

      mainMethods.getFetchData();
    },
    show: function () {},
    hide: function () {},
    update: function (content) {},
  };

  $.fn.newsWidget = function (method) {
    // логика вызова метода
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error(
        'Метод с именем ' + method + ' не существует для jQuery.newsWidget'
      );
    }
  };
})(jQuery);
