// V2
/**
 * 以下單選
 * 紅外線 (IR - Infrared)
 * 瓦斯 (GS - Gas)
 * 水滴 (WP - WaterDrops)
 * 溫濕度 (TH - TemperatureHumidity)
 *
 * 以下可複數使用
 * 風扇 (FN - Fan) value = 0-5
 * 窗戶 (WD - Windows) value = 0, 1
 * 大門 (MD - MainDoor) value = 0, 1
 * 氣氛燈 (AL - AmbientLights) value = Red, Orange, Yellow, Green, Blue, Indigo, Violet, Purple, White, Black
 * 大燈 (HL - Headlights) value = 0, 1
 * 表情符號 (FC - face) value = 0-6
 * 現有音樂 (MC - music) value = 0-5
 * 自訂旋律 (ML - melody) value = string
 */

/*-------------------------------------------------------------------*/

// 紅外線 (IR - Infrared)
function IR() {
    if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        cmd = "someone"
    } else {
        cmd = "no one"
    }

}
// 瓦斯 (GS - Gas)
function GS() {
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        cmd = "dangerous"
    } else {
        cmd = "security"
    }
}
// 水滴 (WP - WaterDrops)
function WP() {
    cmd = pins.analogReadPin(AnalogPin.P0).toString()
}
// 溫濕度 (TH - TemperatureHumidity)
function TH() {
    cmd = input.temperature().toString()
}
// 風扇 (FN - Fan)
function FN(status: number) {
    switch (status) {
        case 0:
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P13, 0)
            break;
        case 1:
            pins.analogWritePin(AnalogPin.P12, 623)
            pins.analogWritePin(AnalogPin.P13, 300)
            break;
        case 2:
            pins.analogWritePin(AnalogPin.P12, 723)
            pins.analogWritePin(AnalogPin.P13, 300)
            break;
        case 3:
            pins.analogWritePin(AnalogPin.P12, 823)
            pins.analogWritePin(AnalogPin.P13, 300)
            break;
        case 4:
            pins.analogWritePin(AnalogPin.P12, 923)
            pins.analogWritePin(AnalogPin.P13, 300)
            break;
        case 5:
            pins.analogWritePin(AnalogPin.P12, 1023)
            pins.analogWritePin(AnalogPin.P13, 300)
            break;
    }
}
// 窗戶 (WD - Windows)
function WD(status: number) {
    if (status == 0) {
        cmd = "Window Open"
        pins.servoSetPulse(AnalogPin.P9, 1028); // 設置脈衝寬度為1028微秒，伺服馬達轉到5度
    } else if (status == 1) {
        cmd = "Window Close"
        pins.servoSetPulse(AnalogPin.P9, 1683); // 設置脈衝寬度為1683微秒，伺服馬達轉到123度
    }
}
// 大門 (MD - MainDoor)
function MD(status: number) {
    if (status == 0) {
        cmd = "Door Open"
        pins.servoSetPulse(AnalogPin.P8, 1028); // 設置脈衝寬度為1028微秒，伺服馬達轉到5度
    } else if (status == 1) {
        cmd = "Door Close"
        pins.servoSetPulse(AnalogPin.P8, 1972); // 設置脈衝寬度為1972微秒，伺服馬達轉到175度
    }
}
// 氣氛燈 (AL - AmbientLights)
// Red, Orange, Yellow, Green, Blue, Indigo, Violet, Purple, White, Black
function AL(colorName: string) {
    switch (colorName) {
        case "Red":
            cmd = "Red Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Red));
            break;
        case "Orange":
            cmd = "Orange Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Orange));
            break;
        case "Yellow":
            cmd = "Yellow Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow));
            break;
        case "Green":
            cmd = "Green Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Green));
            break;
        case "Blue":
            cmd = "Blue Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Green));
            break;
        case "Indigo":
            cmd = "Indigo Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Indigo));
            break;
        case "Violet":
            cmd = "Violet Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Violet));
            break;
        case "Purple":
            cmd = "Purple Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Purple));
            break;
        case "White":
            cmd = "White Light"
            strip.showColor(neopixel.colors(NeoPixelColors.White));
            break;
        case "Black":
            cmd = "Black Light"
            strip.showColor(neopixel.colors(NeoPixelColors.Black));
            break;
    }
}
//大燈 (HL - Headlights)
function HL(status: number) {
    if (status == 1 || status == 0) {
        cmd = "Light Work"
        pins.digitalWritePin(DigitalPin.P16, status)
    }
}
// 表情符號 (FC - face)
function FC(f_type: number) {
    cmd = "Face Work"
    if (f_type == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (f_type == 2) {
        basic.showIcon(IconNames.Sad)
    } else if (f_type == 3) {
        basic.showIcon(IconNames.Asleep)
    } else if (f_type == 4) {
        basic.showIcon(IconNames.Heart)
    } else if (f_type == 5) {
        basic.showIcon(IconNames.Duck)
    } else if (f_type == 6) {
        basic.showIcon(IconNames.House)
    } else if (f_type == 0) {
        basic.clearScreen()
    }
}
// 音樂 (MC - music)
function MC(f_type: number) {
    cmd = "Music Work"
    if (f_type == 1) { //快樂
        music.play(music.stringPlayable("C5 C5 G G A A G - F F E E D D C ", 120), music.PlaybackMode.UntilDone);
    } else if (f_type == 2) { //輕快
        music.play(music.stringPlayable("E G A B - B A G E - G B C5 - - ", 140), music.PlaybackMode.UntilDone);
    } else if (f_type == 3) { //抒情
        music.play(music.stringPlayable("A F E D - E D C - D E F E - A - ", 100), music.PlaybackMode.UntilDone);
    } else if (f_type == 4) { //激昂
        music.play(music.stringPlayable("E E F G G F E D C C D E E D D - ", 150), music.PlaybackMode.UntilDone);
    } else if (f_type == 5) { //悲傷
        music.play(music.stringPlayable("D E F E - D E F E - D E G F - E - ", 90), music.PlaybackMode.UntilDone);
    }
}
// 自訂旋律 (ML - melody)
function ML(melody: string) {
    cmd = "Melody Work"
    music.play(music.stringPlayable(melody, 120), music.PlaybackMode.UntilDone);

}
function setup() {
    basic.showIcon(IconNames.House)
    I2C_LCD1602.LcdInit(39)
    I2C_LCD1602.clear()

    strip = neopixel.create(DigitalPin.P14, 4, NeoPixelMode.RGB) //氣氛燈
    strip.clear()
    strip.show()
    pins.servoSetPulse(AnalogPin.P9, 1028); // 窗戶 設置脈衝寬度為1028微秒，伺服馬達轉到5度
    pins.servoSetPulse(AnalogPin.P8, 1028); // 大門 設置脈衝寬度為1028微秒，伺服馬達轉到5度
    pins.digitalWritePin(DigitalPin.P16, 0) //大燈

    serial.redirect(
        SerialPin.P0,
        SerialPin.P1,
        BaudRate.BaudRate115200
    )
    serial.redirectToUSB()
    serial.setRxBufferSize(128)

    basic.pause(1000)
}



function handleBluetoothCommand(data: any[]) {
    for (let i = 0; i < data.length; i++) {
        serial.writeString(data[i].cmd)
        serial.writeString(data[i].value)
        if (typeof data[i] !== "object" || data[i] === null || data[i].cmd === undefined || data[i].value === undefined) {
            serial.writeString("JSON Item Format Error")
            basic.showIcon(IconNames.No)
        } else {
            switch (data[i]["cmd"]) {
                case "HL":
                    HL(data[i]["value"]);
                    break;
                case "MD":
                    MD(data[i]["value"]);
                    break;
                case "WD":
                    WD(data[i]["value"]);
                    break;
                case "FN":
                    FN(data[i]["value"]);
                    break;
                case "AL":
                    AL(data[i]["value"]);
                    break;
                case "FC":
                    FC(data[i]["value"]);
                    break;
                case "MC":
                    MC(data[i]["value"]);
                    break;
                case "ML":
                    ML(data[i]["value"]);
                    break;
                case "TH":
                    temp_flag = 1
                    water_flag = 0
                    gas_flag = 0
                    people_flag = 0
                    break;
                case "WP":
                    temp_flag = 0
                    water_flag = 1
                    gas_flag = 0
                    people_flag = 0
                    break;
                case "GS":
                    temp_flag = 0
                    water_flag = 0
                    gas_flag = 1
                    people_flag = 0
                    break;
                case "IR":
                    temp_flag = 0
                    water_flag = 0
                    gas_flag = 0
                    people_flag = 1
                    break;
            }
        }
    }
}

function scrollMessage() {
    I2C_LCD1602.ShowString(data, 0, 0)
    I2C_LCD1602.ShowString(cmd, 0, 1)

    if (data.length > 16) {
        I2C_LCD1602.shl();
    }
}


let data = ""
let cmd = ""
let strip: neopixel.Strip = null

let temp_flag = 0
let water_flag = 0
let gas_flag = 0
let people_flag = 0

bluetooth.startUartService()
setup()

basic.forever(function () {
    if (temp_flag == 1) {
        TH()
    } else if (water_flag == 1) {
        WP()
    } else if (gas_flag == 1) {
        GS()
    } else if (people_flag == 1) {
        IR()
    }
    scrollMessage()
    basic.pause(500)
})


input.onButtonPressed(Button.A, function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})

function content_recived(content: string) {
    serial.writeLine(content)
    let json = JSON.parse(content)
    serial.writeLine(typeof json)
    if (typeof json == "object") {
        handleBluetoothCommand(json)
        basic.showIcon(IconNames.Yes)
    } else {
        serial.writeString("JSON Format Error")
        basic.showIcon(IconNames.No)
    }
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let result, content = ""
    let run = true
    while (run) {
        result = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        if (result == "<end>") {
            content = content.replace("\n", "")
            content = content.replace("\r", "")
            content_recived(content)
            //basic.showString(content)
            serial.writeLine(content)
            content = ""
            run = false
        } else {
            content = content + result
        }
    }
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let result, content = ""
    let run = true
    while (run) {
        result = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        if (result == "<end>") {
            content = content.replace("\n", "")
            content = content.replace("\r", "")
            content_recived(content)
            content = ""
            run = false
        } else {
            content = content + result
        }
    }
})

bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
})

bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
})


