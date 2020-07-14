
$('#pomodoro .startButton').click(function () {
    timer.start();
});

$('#pomodoro .pauseButton').click(function () {
    timer.pause();
});

$('#pomodoro .stopButton').click(function () {
    timer.stop();
});

$('#pomodoro .resetButton').click(function () {
    timer.reset();
});

timer.addEventListener('secondsUpdated', function (e) {
    $('#pomodoro .countdown-values').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function (e) {
    $('#pomodoro .countdown-values').html(timer.getTimeValues().toString());
});

timer.addEventListener('reset', function (e) {
    $('#pomodoro .countdown-values').html(timer.getTimeValues().toString());
});