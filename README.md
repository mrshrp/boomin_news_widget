# Новостной виджет Boomin.ru

**Подключение виджета**

`<script src="https://storage.boomin.ru/local/news-widget.min.js"></script>`

Необходимо подключить библиотеку [JQuery](https://jquery.com/)

```javascript
// Основной скрипт
// Выбираем основной контейнер виджета
$('.widget-wrapp').newsWidget({
  token: '', // Индивидуальный токен для подключения
});
// Токен привязывается к домену
```

---

**Отрисовка**

```html
<!--Обертка для виджета-->
<div class="widget-wrapp typ_none">
  <div class="widget-news_block">
    <!--Обертка для новосного блока-->
    <div class="widget-news_item">
      <!--Новостной блок-->
      <div class="widget-news_item_img"></div>
      <!--Изображение-->
      <div class="widget-news_item_title"></div>
      <!--Заголовок-->
      <div class="widget-news_item_preview"></div>
      <!--Текст анонса-->
    </div>
    <div class="widget-news_item">
      <div class="widget-news_item_img"></div>
      <div class="widget-news_item_title"></div>
      <div class="widget-news_item_preview"></div>
    </div>
    <div class="widget-news_item">
      <div class="widget-news_item_img"></div>
      <div class="widget-news_item_title"></div>
      <div class="widget-news_item_preview"></div>
    </div>
  </div>
</div>
```

Перед запросом данных виджет скрывает основную обертку виджета (widget-wrapp).
Виджет ищет в новостном блоке:

- Изображение (widget-news_item_img)
- Заголовок (widget-news_item_title)
- Текст анонса (widget-news_item_title)

Порядок этих блоков не обязательно должен быть таким как в примере.
Также если это необходимо их можно оборачивать в другие теги.

---

```html
<!--Блок с изображением заполняется:-->
<a href="Ссылка на новосить" target="_blank" class="block__img-link">
  <img src="Ссылка на изображение" />
</a>

<!--Блок с заглоловком заполняется:-->
<a href="Ссылка на новость" target="_blank" class="block__title-link">
  Текст заголовка
</a>

<!--Блок с аноносом заполняется-->
<div class="block__text">Текст анонса</div>
```

Если сервер вернул данные то виджет заполняет блоки после чего отображает основной блок.

Максимальное количество возвращаемых новостей 3 шт.
Если с сервера возвращается только одна или две новости, не используемые блоки становятся невидимыми.
Если данных нет то все блоки со вспомогательным классом **type_none** скрываются.

**Кнопка для перехода к списку новостей на площадке boomin.ru**

Кнопку с классом widget-news_btn, виджет ищет по всему документу.
Если кнопка является ссылкой виджет вставит адрес для перехода на список новостей. `<a href="адрес списка новостей вставится автоматически" class="widget-news_btn" target="_blank">Новости</a>`
иначи, виджет повесит событие на нажатие для переход к списку новостей.
`<button class="widget-news_btn">НОВОСТИ</button>`

---
