(function($){
   var schedule = function(callback, table, scope, error){
      var i = 0;
      var tick = function(){
         if(i < table.length){
            try{
               callback.call(scope || window, table[i], i);
               i++;
               setTimeout(tick, table[i]);
            }catch(e){
               if(error)
                  error(e, table[i], i);
            }
         }
      };
      if(table && table.length){
         setTimeout(tick, table[i]);
      }
   };
   
   var convertMillis = function(ms){
      return {
         minutes: Math.floor(ms/60000),
         seconds: Math.floor(ms/1000)%60,
         millis: ms%1000
      };
   };
   
   var pad = function (n){
      return n > 9 ? n+'':'0'+n;
   };
   
   var TBTimer = function(config){
      this.resolution = config.resolution || 10;
      config.specs = config.specs || {};
      this.specs = {
         rounds: config.specs.rounds || 8,
         rest: config.specs.rest || 10,
         work: config.specs.work || 20
      };
      
      
      this.displayEl = $('.timer-display')[0];
      
      
      this.start = function(){};
      this.stop  = function(){};
      this.notify = function(message){};
      this.updateDisplay = function(ms){
         var tm = convertMillis(ms);
         this.displayEl.innerHTML = 
            pad(tm.minutes) + ':' + 
            pad(tm.seconds) + ':' +
            pad(Math.floor(tm.millis/10));
      };
      
      this._doRound = function(rn){
         if(this.rounds[rn]){
            var currentTime = new Date().getTime();
            var elapsedTime = currentTime - this.rounds[rn].start;
            this.updateDisplay(this.rounds[rn].total - elapsedTime);
         }
      };
   };
   
   
   
   $(document).ready(function(){
      /*schedule(function(delay, count){
         console.log('delay: ', delay,', count: ', count);
      }, [1000,2000,3000,4000,5000,1000,1000,1000],
      function(e){
         console.log('Woops! ', e);
      }); 
      */
      tm = new TBTimer({});
      var total = 20000;
      var start = new Date().getTime();
      setInterval(function(){
         var ms = total - (new Date().getTime() - start);
         if(ms >= 0){
            tm.updateDisplay( ms );
         }
      }, 10);
      
   });
   
})(jQuery);
