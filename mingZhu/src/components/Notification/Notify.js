import Notification from './Notification.vue';

const Notify =  {
  install (Vue, options) {
    let innerOptions;
    if (options) {
      innerOptions = options;
    } else {
      innerOptions = {};
    }
    let showedToastrs = [];

    const showToast = function (obj, type) {
      const ToastrComponent = Vue.extend(Notification);
      var propsData = Object.assign(innerOptions, obj, {
        type
      });
      let component = new ToastrComponent({
        el: document.createElement('div'),
        propsData
      });

      showedToastrs.push(component);

      return component;
    };

    Vue.prototype.$message = {
      success(obj) {
        if(typeof obj == "string"){
          obj = {message: obj}
        }
        return showToast(obj, 'success');
      },
      info(obj) {
        if(typeof obj == "string"){
          obj = {message: obj}
        }
        return showToast(obj, 'info');
      },
      warn(obj) {
        if(typeof obj == "string"){
          obj = {message: obj}
        }
        return showToast(obj, 'warning');
      },
      error(obj) {
        if(typeof obj == "string"){
          obj = {message: obj}
        }
        return showToast(obj, 'error');
      },
      removeAll() {
        showedToastrs.forEach(c => {
          c.hideToastr();
        });
        showedToastrs = [];
      }
    };
  }
};

export default Notify;
