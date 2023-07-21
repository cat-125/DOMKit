class Dialog {
  /**
   * Creates new dialog
   * @constructor
   * @param {string} id Dialog HTML ID
   */
  constructor(id) {
    this.gsap = typeof gsap !== 'undefined';
    this.id = id;
    this.d = document.createElement('div');
    document.body.appendChild(this.d);
    this.d.classList.add('dialog');
    this.d.setAttribute('id', 'dialog_' + id);
    this.w = document.createElement('div');
    this.d.appendChild(this.w);
    this.w.classList.add('window');
    this.h = document.createElement('div');
    this.w.appendChild(this.h);
    this.h.classList.add('header');
    this.c = document.createElement('div');
    this.w.appendChild(this.c);
    this.c.classList.add('content');
    this.b = document.createElement('div');
    this.w.appendChild(this.b);
    this.b.classList.add('buttons');
    this.h.style.display = 'none';
    this.b.style.display = 'none';
    this.bc = 0;
    return this;
  }

  /**
   * Set HTML title
   * @param {string} title Title HTML code
   */
  setTitle(title) {
    this.h.innerHTML = title;
    this.h.style.display = 'block';
    return this;
  }

  /**
   * Set title text without HTML support
   * @param {string} title Title text
   */
  setTitleRaw(title) {
    this.h.textContent = title;
    this.h.style.display = 'block';
    return this;
  }

  /**
   * Set HTML content
   * @param {string} content HTML content
   */
  setContent(content) {
    this.c.innerHTML = content;
    return this;
  }

  /**
   * Add new button to dialog
   * @param {string} text Button text
   * @param {function} callback Onclick event
   * @param {array} classes Additional CSS classes
   */
  addButton(text, callback, classes = '') {
    this.bc++;
    this.b.style.display = 'block';
    this.b.style.gridTemplateColumns = `repeat(${this.bc}, 1fr)`;
    let btn = document.createElement('button');
    this.b.appendChild(btn);
    btn.classList.add('btn');
    btn.classList.add(classes);
    btn.innerHTML = text;
    btn.addEventListener('click', () => callback(this));
    return this;
  }

  /**
   * Show dialog
   */
  show() {
    if (this.gsap) {
      this.d.style.display = 'block';
      gsap.fromTo('#dialog_' + this.id, {
        opacity: 0.5
      }, {
        opacity: 1,
        duration: 0.15,
        ease: 'power1.out'
      });
      gsap.fromTo(`#dialog_${this.id} > .window`, {
        scale: 0.9
      }, {
        scale: 1,
        duration: 0.15,
        ease: 'power1.out'
      });
      return this;
    }
    this.d.style.display = 'block';
    this.w.style.display = 'none';
    this.w.style.display = 'block';
    return this;
  }

  /**
   * Hide dialog
   */
  hide() {
    if (this.gsap) {
      gsap.fromTo(`#dialog_${this.id} .window`, {
        scale: 1
      }, {
        scale: 0.95,
        duration: 0.2,
        ease: 'power1.out'
      });
      gsap.to(`#dialog_${this.id}`, {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => this.d.style.display = 'none'
      });
      return this;
    }
    this.d.style.display = 'none';
    return this;
  }

  /**
   * Hide and destroy dialog
   */
  close() {
    this.hide()
    setTimeout(this.destroy, 200);
  }


  /**
   * Destroy dialog
   */
  destroy() {
    document.querySelector(`#dialog_${this.id}`).remove();
  }

  /**
   * Create new alert dialog
   * 
   * @param {string} text Alert message (HTML formatted)
   * @param {string} title Alert title
   */
  static alert(text, title = null) {
    let id = 'alert';
    let d = new Dialog(id);
    if (title) d.setTitle(title);
    d.setContent(text)
      .addButton('Ок', d => d.close(), 'primary')
      .show();
  }

  /**
   * Create confirm dialog
   * 
   * @param {string} text Text
   * @param {string} title Title
   */
  static confirm(text, title = null) {
    let id = 'confirm';
    let d = new Dialog(id);
    if (title) d.setTitle(title);
    return new Promise(res => {
      d.setContent(text)
        .addButton('Отмена', d => {
          d.close();
          res(false);
        })
        .addButton('Продолжить', d => {
          d.close();
          res(true);
        }, 'primary')
        .show();
    });
  }

  /**
   * Create dialog with yes/no select
   * 
   * @param {string} text Text
   * @param {string} title Title
   */
  static question(text, title = null) {
    let id = 'confirm';
    let d = new Dialog(id);
    if (title) d.setTitle(title);
    return new Promise(res => {
      d.setContent(text)
        .addButton('Нет', d => {
          d.close();
          res(false);
        })
        .addButton('Да', d => {
          d.close();
          res(true);
        }, 'primary')
        .show();
    });
  }
}