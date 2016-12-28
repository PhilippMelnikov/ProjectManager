import app from './modules/main'

app.service('finalTaskListService', function() {


  var sortByDateAsc = function (obj1, obj2) {

    if (obj1.date > obj2.date) return 1;
    if (obj1.date < obj2.date) return -1;
    return 0;

  };

  var sortByDateDesc = function (obj1, obj2) {

    if (obj1.date > obj2.date) return -1;
    if (obj1.date < obj2.date) return 1;
    return 0;

  };
  var formatDate = function (userDate) {
    var date    = new Date(userDate),
    yr      = date.getFullYear(),
    month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
    day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
    newDate = day + '.' + month + '.' + yr;
    return newDate;
  };

  var getDayOfWeek = function (date) {
    var string = "";
    var now = moment();
    var myDate = moment(date,"YYYY-DD-MM +-HH:mm:ss");

    if (myDate.isSame(now,'day'))
    {
      string = "Today";
      return string;
    }
    if (myDate.isSame(now.add(1, 'days'),'day'))
    {
      string = "Tomorrow";
      return string;
    }

    var day = myDate.day();


    switch (day) {
      case 0:
      string = "Sunday";
      break;
      case 1:
      string = "Monday";
      break;
      case 2:
      string = "Tuesday";
      break;
      case 3:
      string = "Wednesday";
      break;
      case 4:
      string = "Thursday";
      break;
      case 5:
      string = "Friday";
      break;
      case 6:
      string = "Saturday";
      break;
      default:
      string = 'Потом' ;
    }
    return string;

  };

  // var finalTaskList = [];
  var formTaskList = function (tasks) { // sorting based on date
    
    var days = [];
    console.log('formTaskList');

    for (var key = 0; key<tasks.length; key++) 
    {

      if (days.length<1)
      {
        var day = new Object();
        day.date = tasks[key].Task.created_at;
        day.tasks = [tasks[key].Task];
        days.push(day);
      }
      else
      {
        var flag = false;
        for (var taskListKey = 0; taskListKey<days.length; taskListKey++)
        {
          if(moment(days[taskListKey].date).isSame(moment(tasks[key].Task.created_at),'day'))
          {
            days[taskListKey].tasks.push(tasks[key].Task);
            flag = true;
          }
        }
        if(flag)
        {
          continue;
        }
        var day = new Object();
        day.date = tasks[key].Task.created_at;
        day.tasks = [tasks[key].Task];

        days.push(day);

      }
    }
    days.sort(sortByDateAsc);
    for (var i = 0; i < days.length; i++)
    {
      days[i].dayOfWeek = getDayOfWeek(days[i].date);
      days[i].date = moment(days[i].date,"YYYY-DD-MM +-HH:mm:ss").format("DD.MM.YYYY");
    }

      // finalTaskList = taskList;
      if(days[0])
      console.log("final list", days[0].tasks[0].title);
      return days;

    };

    return {
      formTaskList: formTaskList
    };
  } )