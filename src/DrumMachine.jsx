import React,{useState, useEffect} from "react";
import $ from 'jquery';

function DrumMachine(){

    $(document).on("keypress", function(event){
        var keyPressed = String.fromCharCode(event.which).toUpperCase();
        console.log(keyPressed);
        

        var $button = $(".buttons button").filter(function() {
            return $(this).text() === keyPressed;
        });
    
        // Apply the active hover style to the button
        $button.addClass("active");
    
        // Remove the active hover style after a short delay
        setTimeout(function() {
            $button.removeClass("active");
        }, 200);
    });

    const [event, setEvent] = useState("");
    const [rangeValue, setRangeValue] = useState(50);
    const [powerisOn, setPowerIsOn] =useState(true);
    const [bankIsOn, setBankIsOn] = useState(false);
    const [audio, setAudio] = useState();
    let charStr="";

    const audios = {
        Q : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        W : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        E : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        A : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        S : "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        D : "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        Z : "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        X : "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        C : "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    };
    const audiosBank = {
        Q : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        W : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        E : "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        A : "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        S : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        D : "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        Z : "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        X : "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        C : "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    }
    useEffect(()=>{
        // Add event listener to detect keydown events
        document.addEventListener("keydown", Ouput);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", Ouput);
        };
    }, []);
    
    document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
         charStr = String.fromCharCode(charCode);
         const charStrUpperCase = evt.key.toUpperCase();
         setEvent(charStrUpperCase);
         handleButtonClicked(charStrUpperCase);
    };
    
    function handleButtonClicked(key) {
        if(bankIsOn){
        const audioUrl = audiosBank[key];
        const newAudio = new Audio(audioUrl);
        newAudio.volume = rangeValue / 100;
        setAudio(newAudio);
        newAudio.play();
        setEvent(key);
        }
        else{
        const audioUrl = audios[key];
        const newAudio = new Audio(audioUrl);
        newAudio.volume = rangeValue / 100;
        setAudio(newAudio);
        newAudio.play();
        setEvent(key);
        }
        
    }

    function rangeChanging(event){
        const newValue = event.target.value;
        setRangeValue(newValue);
        setEvent("rangeChanging");
    }

    function PowerOnOff(){
        setPowerIsOn(!powerisOn);
        const buttons = document.querySelectorAll("button");
        setEvent("");

        if(!powerisOn){
            buttons.forEach((btns)=> {
                btns.disabled = false;
            });
            document.getElementsByClassName("form-check-input")[1].disabled = false;
            document.getElementsByClassName("form-range")[0].disabled =false;
        }else{
             buttons.forEach((btns)=> {
                btns.disabled = true;
            });
            document.getElementsByClassName("form-check-input")[1].disabled = true;
            document.getElementsByClassName("form-range")[0].disabled =true;
        }
       
    }
    

    function BankOnOff(){
        setBankIsOn(!bankIsOn);

        if(!bankIsOn){
           setEvent("bankIsOn"); 
        }
        else{
            setEvent("bankIsOff");
        }
        
    }

    function Ouput(e){
        if(e === "rangeChanging"){
            return `Volume ${rangeValue}`;
        }
        if(e === "bankIsOn"){
            return `Smooth Piano Kit`
        }
        if(e == "bankIsOff"){
            return `Heater Kit`;
        }
        if (!bankIsOn) {
            switch (e) {
                case "Q":
                    return `Heater 1`;
                case "W":
                    return `Heater 2`;
                case "E":
                    return `Heater 3`;
                case "A":
                    return `Heater 4`;
                case "S":
                    return `Clap`;
                case "D":
                    return `Open HH`;
                case "Z":
                    return `Kick n' Hat`;
                case "X":
                    return `Kick`;
                case "C":
                    return `Closed HH`;
                default:
                    return "";
            }
        } else {
            switch (e) {
                case "Q":
                    return `Chord 1`;
                case "W":
                    return `Chord 2`;
                case "E":
                    return `Chord 3`;
                case "A":
                    return `Shaker`;
                case "S":
                    return `Open HH`;
                case "D":
                    return `Closed HH`;
                case "Z":
                    return `Punchy Kick`;
                case "X":
                    return `Side Stick`;
                case "C":
                    return `Snare`;
                default:
                    return "";
            }
        }
       
    }

    return(
        <div className="drum-machine-container" id="drum-machine">
            <div className="buttons">
            <button className="drum-pad" onClick={() => handleButtonClicked("Q")}>Q</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("W")}>W</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("E")}>E</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("A")}>A</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("S")}>S</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("D")}>D</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("Z")}>Z</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("X")}>X</button>
                <button className="drum-pad" onClick={() => handleButtonClicked("C")}>C</button>
            </div>
            <div className="controls">
                <p className="power">Power</p>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" 
                    checked={powerisOn} onChange={PowerOnOff}/>
                </div>
                <div className="output">
                    <p className="output-text" id="display">{Ouput(event)}</p>
                </div>
            <input type="range" className="form-range" min="0" max="100" 
                    id="customRange2" onChange={rangeChanging} value={rangeValue}/>
            <p className="bank">Bank</p>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" 
                    checked={bankIsOn} onChange={BankOnOff}/>
                </div>

            </div>
        </div>
    );
}

export default DrumMachine;