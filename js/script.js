// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

    //storing hour of day into variable for comparison to determind past present or future time slots
    var hourOfDay = dayjs().format('H');
    console.log(hourOfDay);

    //get current date in Day, Month, Date format
    var curDay = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(curDay);

    //get ids for each row in scheduler 
    schedHours = $('.time-block');
    console.log(schedHours);

    //for each time block
    schedHours.each(function () {
        //set jQuery timebloack to this
        var $timeBlock = $(this);
        //parseInt on timeblock and store in TimeBlockHour to get the number value
        var timeBlockHour = parseInt($timeBlock.attr('id').split('hour-')[1]);

        //conditionals to check if the hour of day matches, or is less than the hour number from the id in the timeblock rows
        if (parseInt(hourOfDay) === timeBlockHour) {
            //sets to present if the hour of day anf time block hour match
            $timeBlock.addClass('present');
        } else if (parseInt(hourOfDay) < timeBlockHour) {
            //sets to future if the hour of day is less than the time block hour 
            $timeBlock.addClass('future');
        } else {
            //sets all other timeblocks to the past 
            $timeBlock.addClass('past');
        }

        // gets value from local storage by id and stores it in the savedEvent variable
        var savedEvent = localStorage.getItem($timeBlock.attr('id'));

        //if savedEvent exists 
        if (savedEvent) {
            //sets the textarea of the $timeBlock to the value of the savedEvent
            $timeBlock.children('textarea').val(savedEvent);
        }

    });


    //  Event listener for save click
    schedHours.on('click', '.saveBtn', saveTimeBlock);

    //function for saviung time block 
    function saveTimeBlock(event) {
        event.preventDefault();
        
        //Get the id using this 
        var eventBlock = $(this).parent().attr('id');
        console.log(eventBlock);
        //Get input text using this 
        eventText = $(this).parent().children('textarea').val();
        console.log(eventText);

        //set local storage to eventBlock as the key and eventText as the value
        localStorage.setItem(eventBlock, eventText);


    }

});

