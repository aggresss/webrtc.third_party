

  /**
   * `Polymer.IronMenuBehavior` implements accessible menu behavior.
   *
   * @demo demo/index.html
   * @polymerBehavior Polymer.IronMenuBehavior
   */
  Polymer.IronMenuBehaviorImpl = {

    properties: {

      /**
       * Returns the currently focused item.
       * @type {?Object}
       */
      focusedItem: {
        observer: '_focusedItemChanged',
        readOnly: true,
        type: Object
      },

      /**
       * The attribute to use on menu items to look up the item title. Typing the first
       * letter of an item when the menu is open focuses that item. If unset, `textContent`
       * will be used.
       */
      attrForItemTitle: {
        type: String
      }
    },

    hostAttributes: {
      'role': 'menu',
      'tabindex': '0'
    },

    observers: [
      '_updateMultiselectable(multi)'
    ],

    listeners: {
      'focus': '_onFocus',
      'keydown': '_onKeydown'
    },

    keyBindings: {
      'up': '_onUpKey',
      'down': '_onDownKey',
      'esc': '_onEscKey',
      'enter': '_onEnterKey',
      'shift+tab:keydown': '_onShiftTabDown'
    },

    _updateMultiselectable: function(multi) {
      if (multi) {
        this.setAttribute('aria-multiselectable', 'true');
      } else {
        this.removeAttribute('aria-multiselectable');
      }
    },

    _onShiftTabDown: function() {
      var oldTabIndex;

      Polymer.IronMenuBehaviorImpl._shiftTabPressed = true;

      oldTabIndex = this.getAttribute('tabindex');

      this.setAttribute('tabindex', '-1');

      this.async(function() {
        this.setAttribute('tabindex', oldTabIndex);
        Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;
      // Note: polymer/polymer#1305
      }, 1);
    },

    _applySelection: function(item, isSelected) {
      if (isSelected) {
        item.setAttribute('aria-selected', 'true');
      } else {
        item.removeAttribute('aria-selected');
      }

      Polymer.IronSelectableBehavior._applySelection.apply(this, arguments);
    },

    _focusedItemChanged: function(focusedItem, old) {
      old && old.setAttribute('tabindex', '-1');
      if (focusedItem) {
        focusedItem.setAttribute('tabindex', '0');
        focusedItem.focus();
      }
    },

    select: function(value) {
      if (this._defaultFocusAsync) {
        this.cancelAsync(this._defaultFocusAsync);
        this._defaultFocusAsync = null;
      }
      var item = this._valueToItem(value);
      if (item && item.hasAttribute('disabled')) return;
      this._setFocusedItem(item);
      Polymer.IronMultiSelectableBehaviorImpl.select.apply(this, arguments);
    },

    _onFocus: function(event) {
      if (Polymer.IronMenuBehaviorImpl._shiftTabPressed) {
        return;
      }
      // do not focus the menu itself
      this.blur();
      // clear the cached focus item
      this._setFocusedItem(null);
      this._defaultFocusAsync = this.async(function() {
        // focus the selected item when the menu receives focus, or the first item
        // if no item is selected
        var selectedItem = this.multi ? (this.selectedItems && this.selectedItems[0]) : this.selectedItem;
        if (selectedItem) {
          this._setFocusedItem(selectedItem);
        } else {
          this._setFocusedItem(this.items[0]);
        }
      // async 100ms to wait for `select` to get called from `_itemActivate`
      }, 100);
    },

    _onUpKey: function() {
      // up and down arrows moves the focus
      this._focusPrevious();
    },

    _onDownKey: function() {
      this._focusNext();
    },

    _onEscKey: function() {
      // esc blurs the control
      this.focusedItem.blur();
    },

    _onEnterKey: function(event) {
      // enter activates the item unless it is disabled
      this._activateFocused(event.detail.keyboardEvent);
    },

    _onKeydown: function(event) {
      if (this.keyboardEventMatchesKeys(event, 'up down esc enter')) {
        return;
      }

      // all other keys focus the menu item starting with that character
      this._focusWithKeyboardEvent(event);
    },

    _focusWithKeyboardEvent: function(event) {
      for (var i = 0, item; item = this.items[i]; i++) {
        var attr = this.attrForItemTitle || 'textContent';
        var title = item[attr] || item.getAttribute(attr);
        if (title && title.trim().charAt(0).toLowerCase() === String.fromCharCode(event.keyCode).toLowerCase()) {
          this._setFocusedItem(item);
          break;
        }
      }
    },

    _activateFocused: function(event) {
      if (!this.focusedItem.hasAttribute('disabled')) {
        this._activateHandler(event);
      }
    },

    _focusPrevious: function() {
      var length = this.items.length;
      var index = (Number(this.indexOf(this.focusedItem)) - 1 + length) % length;
      this._setFocusedItem(this.items[index]);
    },

    _focusNext: function() {
      var index = (Number(this.indexOf(this.focusedItem)) + 1) % this.items.length;
      this._setFocusedItem(this.items[index]);
    }

  };

  Polymer.IronMenuBehaviorImpl._shiftTabPressed = false;

  /** @polymerBehavior Polymer.IronMenuBehavior */
  Polymer.IronMenuBehavior = [
    Polymer.IronMultiSelectableBehavior,
    Polymer.IronA11yKeysBehavior,
    Polymer.IronMenuBehaviorImpl
  ];

