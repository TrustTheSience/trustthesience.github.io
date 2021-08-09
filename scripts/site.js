function localize()
{
    if (navigator.language.startsWith('zh'))
    {
        document.getElementById('oobe-header').innerText = '因為相信顆學，所以覺得安全';
        document.getElementById('oobe-p1').innerText = '為了獲得一個完全顆學的體驗，請將 Trust the Sience 加至你的主畫面';
        document.getElementById('oobe-p2').innerHTML = `點選&nbsp;&nbsp;
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAmCAMAAADkx9tQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMC1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRUZFQkE4M0ZCNTQxMUVCOUI3RTk4NDRGQkExM0JFQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRUZFQkE4NEZCNTQxMUVCOUI3RTk4NDRGQkExM0JFQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFFRkVCQTgxRkI1NDExRUI5QjdFOTg0NEZCQTEzQkVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFFRkVCQTgyRkI1NDExRUI5QjdFOTg0NEZCQTEzQkVBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+C5pElQAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAY0lEQVR42uzTUQrAIAwD0OT+l95AnMkaiwewH4p9Iq1QUANveOKv7ihqjqrqCCqOpMuNZQk8G0t80PeGv3JkG/dArdZ4lrlnnHAuLXxxOV0eGXZMXk4DTTIPZQ722D1CPgIMAKOpAst7gHauAAAAAElFTkSuQmCC" style="width: 0.8em; height: 1em;">
                                                        &nbsp;&nbsp;再「加入主畫面」`;
        document.getElementById('existingMessageTimestamp').innerHTML = '<strong>昨天</strong> 上午 11:38';
    }
}

function extractLocationId(text)
{
    let regex = /(\d{4}\s?\d{4}\s?\d{4}\s?\d{3})/;
    let match = text.match(regex);
    
    if (match != null && match.length == 2)
    {
        return formatLocationId(match[1]);
    }
    else
    {
        return '';
    }
}

function getLocalizedTimestamp(date)
{
    var hours = (date.getHours() + 24) % 12 || 12;
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    if (navigator.language.startsWith('zh'))
    {
        return '<strong>今天</strong> ' + (date.getHours() < 12 ? '上午' : '下午') + ' ' + hours + ':' + minutes;
    }
    else
    {
        return '<strong>Today</strong> ' + hours + ':' + minutes + ' ' + (date.getHours() < 12 ? 'AM' : 'PM');
    }
}

function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function getRandomLocationId()
{
    return `2${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)} ${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)} ${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)} ${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}`;
}

function formatLocationId(locationId)
{
    let regex = /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{3})$/;
    let match = locationId.match(regex);
    
    if (match != null && match.length == 5)
    {
        return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    else
    {
        return '';
    }
}

function sendMessage(locationId)
{
    if (formatLocationId(locationId).length > 0)
    {
        locationId = formatLocationId(locationId);

        localStorage.setItem('locationId', locationId);
        document.getElementById('locationId').value = '';
        stylizeSendButton();

        var now = new Date(Date.now());
        document.getElementById('newMessageTimestamp').innerHTML = getLocalizedTimestamp(now);
        document.getElementById('newMessageLocationId').innerText = formatLocationId(locationId);
        document.getElementById('newMessage').style.display = 'block';
    }
}

function stylizeSendButton()
{
    document.getElementById('sendButton').style.color = document.getElementById('locationId').value.length > 0 ? '#00c744' : '#858e99';
}

function sendButton_onClick()
{
    if (document.getElementById('locationId').value.length > 0)
    {
        sendMessage(document.getElementById('locationId').value);
    }
    else
    {
        document.getElementById('locationId').value = getRandomLocationId();
        stylizeSendButton();
    }
}

function cameraButton_onClick()
{
    if (document.getElementById('qrcode').files.length > 0)
    {
        var file = document.getElementById('qrcode').files[0];
        
        var reader = new FileReader();
        reader.onload = function(loadedEvent)
        {
            var img = document.createElement('img');

            img.onload = function()
            {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                canvas.width = 1024;
                canvas.height = 1024;

                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

                QrScanner.scanImage(canvas.toDataURL())
                    .then(result =>  
                    {
                        var extractedLocationId = extractLocationId(result);
                        if (extractedLocationId.length > 0)
                        {
                            sendMessage(extractedLocationId);
                        }
                        else
                        {
                            alert('Unsupported QR code.');
                        }
                    })
                    .catch(error => alert('Could not detect a valid QR code.'));
            };

            img.src = loadedEvent.target.result;
        }
        
        reader.readAsDataURL(file);
    }
}

localize();

if (typeof(Storage) !== "undefined")
{
    document.getElementById('locationId').value = localStorage.getItem("locationId");
    stylizeSendButton();
    document.getElementById('existingMessageLocationId').innerText = getRandomLocationId();
}

if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.navigator.standalone)
{
    document.getElementById('oobe').style.display = 'block';
    document.getElementsByClassName('content')[0].style.display = 'none';
}
else
{
    document.getElementById('oobe').style.display = 'none';
    document.getElementsByClassName('content')[0].style.display = 'block';
}