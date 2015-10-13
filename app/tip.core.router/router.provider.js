//DRAFT VERSION JUST FOR POC
angular.module('tip.core.router', [ 'ui.router' ])
  .provider('tipRouter', ['$stateProvider', function($stateProvider){
    var self = this;
    var rootState;
    var nestedQueue=[];
    /**
     * Recursively sets the states using $stateProvider.state.
     * Child states are defined via a `children` property.
     *
     * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
     * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
     * 3. Sets `parent` property of the descendant states.
     *
     * @param {Object} state - A regular ui.router state object.
     * @param {Array} [state.children] - An optional array of child states.
     * @deprecated {Boolean} keepOriginalNames - An optional flag that prevents conversion
     *     of names to dot notation if true. (use options.keepOriginalNames instead)
     * @param {Object} [options] - An optional options object.
     * @param {Boolean} [options.keepOriginalNames=false] An optional flag that
     *     prevents conversion of names to dot notation if true.
     * @param {Boolean} [options.siblingTraversal=false] An optional flag that
     *     adds `nextSibling` and `previousSibling` properties when enabled
     */
    this.state = function(state){
      var args = Array.prototype.slice.apply(arguments);
      var options = {
        keepOriginalNames: false,
        siblingTraversal: false
      };

      if (typeof args[1] === 'boolean') {
        options.keepOriginalNames = args[1];
      }
      else if (typeof args[1] === 'object') {
        angular.extend(options, args[1]);
      }

      if (!options.keepOriginalNames) {
        fixStateName(state);
      }

      $stateProvider.state(state);

      if(state.children && state.children.length){
        state.children.forEach(function(childState){
          childState.parent = state;
          self.state(childState, options);
        });

        if (options.siblingTraversal) {
          addSiblings(state);
        }
      }

      return self;
    };

    this.setNestedState = this.state;

    this.addNestedState = function(state){
      nestedQueue.push(state);
    };
    function registerNested(){
      nestedQueue.forEach(function(childState){
        childState.parent = rootState;
        self.state(childState);
      });
    }

    this.setRootState = function(state){
      rootState = state;
      registerNested();
      return self.state(state);
    };
    this.$get = function() {
      return {
        getRootState:function(){
          return rootState;
        }
      };
    };

    /**
     * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
     * @param state
     */
    function fixStateName(state){
      if(state.parent){
        state.name = (angular.isObject(state.parent) ? state.parent.name : state.parent) + '.' + state.name;
      }
    }

    function addSiblings(state) {
      state.children.forEach(function (childState, idx, array) {
        if (array[idx + 1]) {
          childState.nextSibling = array[idx + 1].name;
        }
        if (array[idx - 1]) {
          childState.previousSibling = array[idx - 1].name;
        }
      });
    }
  }]);
