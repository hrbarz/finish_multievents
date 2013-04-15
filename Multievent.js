function Multievent(total){

	return {

		data: [],
		status: [],
		actions: [],
		
		total: total,
		step: 0,

		set_total: function(n){
			this.total = n;
		},

		ini: function(name){

			this.status[name] = false;

		},

		end: function(name){

			this.status[name] = true;			

		},

		set_data: function(name,value){

			this.data[name] = value;
		},

		get_status_start: function(){

			var t = 0;
			for(var i in this.status){
				t++;
			}

			return t;
		},

		get_status_finish: function(){

			var t = 0;
			for(var i in this.status){

				if(this.status[i] == true) t++;

			}

			return t;
		},

		set_callback: function(name,callback){

			this.actions[name] = callback;
		},

		exec_actions: function(){

			for(var i in this.actions){

				if( typeof this.actions[i] === 'function'){

					this.actions[i]();
				}
			}
		},

		
		interval_limit:{
			waiting_max: 10,
			waiting_inc: 0,
			if_finish_max: 50,
			if_finish_inc: 0			
		},

		waiting_start: function(){


			if(this.total === this.get_status_start() && this.step === 0 ){

				console.log('Iniciando..');
				
				this.step = 1;

				clearInterval(this.interval_checkStart);

			}

			this.waiting_start_check();


		},

		waiting_start_check: function(){

			this.interval_limit.waiting_inc++;

			if(this.interval_limit.waiting_inc == this.interval_limit.waiting_max){

				console.log('Tiempo termindo para iniciar');
			
				clearInterval(this.interval_checkStart);
			
			}

		},

				
		if_finished: function(){

			if(this.get_status_finish() == this.total && this.step == 1 ){

				console.log('Finalizando..');

				this.step = 2;

				clearInterval(this.interval_ifFinished);

				this.exec_actions();

				this.callback(this.data);
			}

			this.if_finished_check();
			
		},

		if_finished_check: function(){

			this.interval_limit.if_finish_inc++;

			if(this.interval_limit.if_finish_inc == this.interval_limit.if_finish_max){

				console.log('Tiempo de esperar superado para finished');
				console.log(this.status);

			
				clearInterval(this.interval_ifFinished);
			
			}

		},

		finish: function(callback){

			this.callback = callback;
			
			that = this; 

			this.interval_checkStart = setInterval(function(){ 
					
				that.waiting_start();

			},10);

			this.interval_ifFinished = setInterval(function(){

				that.if_finished();

			},20);			
			
		}

	}

}