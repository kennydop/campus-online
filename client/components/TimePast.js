function TimePast({date, read, lastSeen, msg, _sent}) {
  const timeAgo = date && date.getTime()
  const TimeAgo = (function() {
    var self = {};
    
    // Public Methods
    self.locales = {
      prefix: '',
      
      seconds: 'just now',
      minute:  'a minute ago',
      minutes: '%d minutes ago',
      hour:    'an hour ago',
      hours:   '%d hours ago',
      day:     'yesterday',
      days:    '%d days ago',
      month:   'last month',
      months:  '%d months ago',
      year:    'last year',
      years:   '%d years ago'
    };
    
    self.inWords = function(timeAgo) {
      var seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
          separator = this.locales.separator || ' ',
          words = this.locales.prefix + separator,
          interval = 0,
          intervals = {
            year:   seconds / 31536000,
            month:  seconds / 2592000,
            day:    seconds / 86400,
            hour:   seconds / 3600,
            minute: seconds / 60
          };
      
      var distance = this.locales.seconds;
      
      for (var key in intervals) {
        interval = Math.floor(intervals[key]);
        
        if (interval > 1) {
          distance = this.locales[key + 's'];
          break;
        } else if (interval === 1) {
          distance = this.locales[key];
          break;
        }
      }
      
      distance = distance.replace(/%d/i, interval);
      words += distance + separator;
  
      return words.trim();
    };
    
    return self;
  }());

  return (
    msg || lastSeen ?
      <>
        {lastSeen && <span className='fit-content text-xs'>{(lastSeen==="online" || lastSeen==="typing") ? lastSeen : TimeAgo.inWords(new Date(lastSeen).getTime())}</span>}
        {msg && <span className="mr-1 text-1/5xs font-light">{(_sent ? 'sent: ': 'recieved: ')+TimeAgo.inWords(timeAgo)}</span>}
      </>
      :
      read === undefined ? 
        <span className={`text-sm text-gray-500 dark:text-gray-400 truncate`}>{TimeAgo.inWords(timeAgo)}</span>
        :
        <div className = 'absolute bottom-3 right-3'><span className={`text-xs font-light ${read ? 'text-gray-400 dark:text-gray-500' : 'text-pink-500'}`}>{TimeAgo.inWords(timeAgo)}</span></div>

  )
}

export default TimePast


