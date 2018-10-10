(function($) {
	// CONSTANTS
	var NEG_INF = Number.NEGATIVE_INFINITY;
	var POS_INF = Number.POSITIVE_INFINITY;
	var TS_ATTR	= 'data-timestamp';


	$.fn.cuteTime = function(options) {
		var right_now = new Date().getTime();
		var other_time;
		var curr_this;

		// check for new & valid options
		if ((typeof options == 'object') || (options == undefined)) {
			// then update the settings [destructive]
			$.fn.cuteTime.c_settings = $.extend({}, $.fn.cuteTime.settings, options);
			$.fn.cuteTime.the_selected = this;

			// process all provided objects
			this.each(function() {
				// element-specific code here
				curr_this = $(this);
				other_time = get_time_value(curr_this);
				curr_this.html(get_cuteness(right_now - other_time));
			});

			// check for and conditionally launch the automatic refreshing of timestamps
			$.fn.cuteTime.start_cuteness();
		}
		
		return this;
	};


    
	$.cuteTime = function(options, val) {
		var right_now = new Date().getTime();
		var other_time;
		var curr_this;
		var ts_string = null;

		if (typeof options == 'object') {
			$.fn.cuteTime.c_settings = $.extend({}, $.fn.cuteTime.settings, options);
		} 

		if (typeof options == 'string') {
			ts_string = options;
		} else if (typeof val == 'string') {
			ts_string = val;	
		}
	
		if (ts_string != null) {
			// then we will be returning a cutetime string and doing nothing else
			other_time = date_value(ts_string);
			if (!isNaN(other_time)) {
				return get_cuteness(right_now - other_time);
			} else {
				// on failure return error message
				return 'INVALID_DATETIME_FORMAT';
			}
		}

		return this;
	};


	$.fn.cuteTime.settings = {
		refresh: -1,					// time in milliseconds before next refresh of page data; -1 == no refresh
		time_ranges: [
			{bound: NEG_INF,			// IMPORANT: bounds MUST be in ascending order, from negative infinity to positive infinity
					cuteness: 'لحظات',		unit_size: 0},
			{bound: 0, 
					cuteness: 'لحظات',			unit_size: 0},
			{bound: 20 * 1000, 
					cuteness: 'أقل من دقيقة',	unit_size: 0},
			{bound: 60 * 1000, 
					cuteness: 'دقيقة',		unit_size: 0},
                    
			{bound: 60 * 1000 * 2, 
					cuteness: 'دقيقتين',		unit_size: 0},

            {bound: 60 * 1000 * 3, 
                    cuteness: ' دقائق',        unit_size: 60 * 1000},                    

            {bound: 60 * 1000 * 11, 
                    cuteness: ' دقيقة',        unit_size: 60 * 1000},                    
                    
                    
			{bound: 60 * 1000 * 60, 
					cuteness: 'ساعة',		unit_size: 0},

            {bound: 60 * 1000 * 60 * 2, 
                    cuteness: 'ساعتين',        unit_size: 0},

            {bound: 60 * 1000 * 60 * 3, 
                    cuteness: ' ساعات',            unit_size: 60 * 1000 * 60},

            {bound: 60 * 1000 * 60 * 11, 
                    cuteness: ' ساعة',            unit_size: 60 * 1000 * 60},
                    

			{bound: 60 * 1000 * 60 * 24, 
					cuteness: 'الأمس',			unit_size: 0},
                    

            {bound: 60 * 1000 * 60 * 24 * 2, 
                    cuteness: 'يومين',            unit_size: 0},                    
                                        
			{bound: 60 * 1000 * 60 * 24 * 3, 
					cuteness: ' أيام',			unit_size: 60 * 1000 * 60 * 24},

            {bound: 60 * 1000 * 60 * 24 * 11, 
                    cuteness: ' يوم',            unit_size: 60 * 1000 * 60 * 24},                    
                    
			{bound: 60 * 1000 * 60 * 24 * 30,	
					cuteness: 'شهر',			unit_size: 0},
                    

            {bound: 60 * 1000 * 60 * 24 * 30 * 2, 
                    cuteness: 'شهرين',        unit_size: 0},                  
                   
                    
			{bound: 60 * 1000 * 60 * 24 * 30 * 3, 
					cuteness: ' شهور',		unit_size: 60 * 1000 * 60 * 24 * 30},

            {bound: 60 * 1000 * 60 * 24 * 30 * 11, 
                    cuteness: ' شهر',        unit_size: 60 * 1000 * 60 * 24 * 30},                    
                    
                    
			{bound: 60 * 1000 * 60 * 24 * 30 * 12, 
					cuteness: 'عام',			unit_size: 0},
                    
                    
			{bound: 60 * 1000 * 60 * 24 * 30 * 12 * 2, 
					cuteness: 'عامين',			unit_size: 0},

            {bound: 60 * 1000 * 60 * 24 * 30 * 12 * 3, 
                    cuteness: ' أعوام',            unit_size: 60 * 1000 * 60 * 24 * 30 * 12},
                    
            {bound: 60 * 1000 * 60 * 24 * 30 * 12 * 11, 
                    cuteness: ' عام',            unit_size: 60 * 1000 * 60 * 24 * 30 * 12},                    
                    
                    
			{bound: POS_INF, 
					cuteness: 'a blinkle ago',		unit_size: 0}
		]
	};


	$.fn.cuteTime.start_cuteness = function() {
		var refresh_rate = $.fn.cuteTime.c_settings.refresh;

		if ($.fn.cuteTime.process_tracker == null) {
			if (refresh_rate > 0) {
				$.fn.cuteTime.process_tracker = setInterval( "$.fn.cuteTime.update_cuteness()", refresh_rate );
			}
		} else { 
			// ignore this call; auto-refresh is already running!!
		}
		return this;
	};


	$.fn.cuteTime.update_cuteness = function() {
		var right_now = new Date().getTime();
		var curr_this;
		var other_time;

		$.fn.cuteTime.the_selected.each(function() {
			curr_this = $(this);
			other_time = get_time_value(curr_this);
			curr_this.html(get_cuteness(right_now - other_time));
		});
	}


	$.fn.cuteTime.stop_cuteness = function() {
		if ($.fn.cuteTime.process_tracker != null) {
			clearInterval($.fn.cuteTime.process_tracker);
			$.fn.cuteTime.process_tracker = null;
		} else {
			// ignore this call; there is nothing to stop!!
		}
		
		return this;
	};



	function get_cuteness(time_difference) {
		var time_ranges = $.fn.cuteTime.c_settings.time_ranges;
		var pre_calculated_time, calculated_time;
		var cute_time = '';

		jQuery.each(time_ranges, function(i, timespan) {
			if (i < time_ranges.length-1) {
				if ((	time_difference		>=		timespan['bound']) &&
					(	time_difference		<		time_ranges[i+1]['bound'])) {
					if (timespan['unit_size'] > 0) {
						calculated_time = Math.floor(time_difference / timespan['unit_size']);
					} else {
						calculated_time = '';
					}

					// allow for inline replacement
					pre_calculated_time = timespan['cuteness'].replace(/%CT%/, calculated_time);
					
					if (pre_calculated_time == timespan['cuteness']) {
						// nothing was replaced
						// prepend the value
						cute_time = "منذ " +calculated_time + timespan['cuteness'];
						
					} else {
						// inline replacement occurred
						cute_time = pre_calculated_time;
					}

					return false;
				}
			} else {
				return false;
			}
		});

		// something is wrong with the time
		if (cute_time == '') {
			cute_time = '2 pookies ago'; // IMPORTANT: ALWAYS BE CUTE!!! 
		}

		return cute_time;
	}

    
	function date_value(the_date) {
	
		var the_value;
	
		if ((new_date = toISO8601(the_date)) != null) {
			the_value = new_date.valueOf();
		} else {
		
			the_value = (new Date(the_date)).valueOf();
			
			if (isNaN(the_value)) {
				// then the date must be the alternate db styled format
				the_value = new Date(the_date.replace(/-/g, " "));
			}
		}
		return the_value;
	}


	
	function toISO8601(the_date){
	
		var iso_date = the_date.match(/^(\d{4})((-(\d{2})(-(\d{2})(T(\d{2}):(\d{2})(:(\d{2})(.(\d+))?)?(Z|(([+-])((\d{2}):(\d{2})))))?)?)?)$/);
		
		if (iso_date != null) {
			var new_date = new Date();
			var TZ_hour_offset = 0;
			var TZ_minute_offset = 0;
			
			new_date.setUTCFullYear(iso_date[1]);
			if (!isEmpty(iso_date[4])) {
				new_date.setUTCMonth(iso_date[4] - 1);
				if (!isEmpty(iso_date[6])) {
					new_date.setUTCDate(iso_date[6]);
					
					// check TZ first
					if (!isEmpty(iso_date[16])) {
						TZ_hour_offset = iso_date[18];
						TZ_minute_offset = iso_date[19];
						
						if (iso_date[16] == '-') { // is the time offset negative ?
							TZ_hour_offset *= -1;
							TZ_minute_offset *= -1;
						} // otherwise: timeoffset is positive & do nothing
					}
					
					if (!isEmpty(iso_date[8])) {
						new_date.setUTCHours(iso_date[8] - TZ_hour_offset);
						new_date.setUTCMinutes(iso_date[9] - TZ_minute_offset)
						if (!isEmpty(iso_date[11])) {
							new_date.setUTCSeconds(iso_date[11]);
							if (!isEmpty(iso_date[13])) {
								new_date.setUTCMilliseconds(iso_date[13]*1000);
							}
						}
					}
					
				}
			}

			return new_date;
		} else {
			return null;
		}
	}


	function isEmpty( inputStr ) { 
		if ( null == inputStr || "" == inputStr ) { 
			return true; 
		} 
		
		return false; 
	}


    
	function get_time_value(obj) {
		var time_value = Number.NaN;

		var time_string = get_cutetime_attr(obj); // returns string or NULL
		if (time_string != null) {
			time_value = date_value(time_string);
		}

		if (isNaN(time_value)) {
			time_string = get_object_text(obj);
			if (time_string != null) {
				time_value = date_value(time_string);
			}
		}

		// if nothing valid available then set time to RIGHT NOW
		if (isNaN(time_value)) {
			time_string = new Date().toString();
			time_value = date_value(time_string);
		}

		// update cutetime attribute and return the time_value
		set_cutetime_attr(time_string, obj);
		return time_value;
	}

    
	function get_cutetime_attr(obj) {
		var return_value = obj.attr(TS_ATTR);

		if (return_value != undefined) {
			return return_value;
		} else {
			return null;
		}
	}

    
	function set_cutetime_attr(attr, obj) {
		// assume valid attr(ibute) value
		obj.attr(TS_ATTR, attr);
	}

    
	function get_object_text(obj) {
		return obj.text();
	}

})(jQuery);
