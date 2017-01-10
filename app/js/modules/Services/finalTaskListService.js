import app from './modules/main'
const util = require('util')

app.service('finalTaskListService', function() {

  var finalTaskList = [];
  var searchResults = [];

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
    var myDate = moment(date,"YYYY-MM-DD +-HH:mm:ss");

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

  var formTaskList = function (tasks) { // sorting based on date
    
    var days = [];
    console.log('formTaskList');

    for (var key = 0; key<tasks.length; key++) 
    {

      if (days.length<1)
      {
        var day = new Object();
        day.date = tasks[key].Task.created_at;
        console.log('date',day.date);
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
    // days.sort(sortByDateAsc);
    for (var i = 0; i < days.length; i++)
    {
      days[i].dayOfWeek = getDayOfWeek(days[i].date);
      days[i].date = moment(days[i].date,"YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");
      // days[i].tasks.reverse();
    }

      searchResults = angular.copy(days);
      
      console.log('searchResults', searchResults);
      finalTaskList = days;

      return true;

    };

    var getFinalTaskList = function () {
      return finalTaskList;
    };

    var search = function (searchText) {
      searchResults = angular.copy(finalTaskList);
      if(searchText=='')
      {
       return searchResults;
      }
       function CustomSearch(searchQuery, element) 
       {
           // var regexp = new RegExp(searchText, "i");
           var regexp = new RegExp(searchText, "i");
           var res = -1;
           for(var key in element)
           {
            if(key!='image')
              {
                // console.log('element[key] ', element[key]);
                if(util.isString(element[key]))
               { 
                res = element[key].search(regexp);
                if(res>-1)
                {
                  return true;
                }
              }
              }
           }
           
           return false;
         }

      for(let i = 0; i < searchResults.length; i++)
      {
        console.log('searchResults' + i, searchResults[i]);
        searchResults[i].tasks = searchResults[i].tasks.filter(CustomSearch.bind(this,searchText));
        if(!searchResults[i].tasks[0])
        {
          searchResults.splice(i, 1);
          i--;
        }
      }
      return searchResults;
    };

    var postCreateAppendTask = function (task) {
      let now = new Date();
      let dayOfWeek = getDayOfWeek(now);
      let date = moment(now, "YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");
      for (let i = 0; i< finalTaskList.length; i++)
      {
        if(finalTaskList[i].date===date)
          {
            finalTaskList[i].tasks.unshift(task);
            return true;
          }
      }
      let day = new Object();
      day.date = date;
      day.tasks = [task];
      day.dayOfWeek = dayOfWeek;
      finalTaskList.unshift(day);
    };


    var appendTask = function (task) {

        let flag = true;
        let date = moment(task.created_at, "YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");
        
        for (let i = 0; i< finalTaskList.length; i++)
        {
          if(finalTaskList[i].date===date)
            {
              finalTaskList[i].tasks.push(task);
              flag = false;
              break;
            }
        }
        if (flag)
        {
          let day = new Object();
          day.date = date;
          day.tasks = [task];
          day.dayOfWeek = getDayOfWeek(task.created_at);
          finalTaskList.push(day);
        }
      };

    var appendNewTasks = function (tasks)
    {

      for (let i = 0; i < tasks.length; i++)
      {
        appendTask(tasks[i].Task);
      }

    };


    return {
      formTaskList: formTaskList,
      getFinalTaskList: getFinalTaskList,
      search: search,
      postCreateAppendTask: postCreateAppendTask,
      appendNewTasks: appendNewTasks,
      getDayOfWeek: getDayOfWeek,
      formatDate: formatDate

    };
  } )