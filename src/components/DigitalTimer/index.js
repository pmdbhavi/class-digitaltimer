import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component{
    state={minutes:25,play:false,seconds:0}

    componentWillUnmount(){
        this.clearTimer()
    }

    clearTimer=()=>clearInterval(this.timerId)

    onIncrement=()=>{
        const {play}=this.state
        if(!play){
            this.setState(prevState=>({minutes:prevState.minutes+1}))
        }
    }

    onDecrement=()=>{
        const {play,minutes}=this.state
        if(!play && minutes>1){
            this.setState(prevState=>({minutes:prevState.minutes-1}))
        }
    }

    onChangePlay=()=>{
        const {minutes,seconds,play}=this.state
        const timerCompleted=minutes*60===seconds
        if(timerCompleted){
            this.setState({seconds:0})
        }
        if(!play){
            this.timerId=setInterval(this.getIncrement,1000)
        }
        else{
            this.clearTimer()
        }

        this.setState(prevState=>({play:!prevState.play}))
        
    }

    onReset=()=>{
        this.setState({minutes:25})
        this.setState({play:false})
        this.setState({seconds:0})
        this.clearTimer()
    }

    getIncrement=()=>{
        const {minutes,seconds}=this.state
        const timerCompleted=minutes*60===seconds
        if(timerCompleted){
            this.setState({play:false})
        }else{
            this.setState(prevState=>({seconds:prevState.seconds+1}))
        }
    }

    getStringifiedTime=()=>{
        const {minutes,seconds}=this.state
        const totalRemainingSeconds=minutes*60-seconds
        const min=Math.floor(totalRemainingSeconds/60)
        const sec=Math.floor(totalRemainingSeconds%60)
        const stringifiedMin=min>9 ? min:`0${min}`
        const stringifiedSec=sec>9 ? sec:`0${sec}`
        return `${stringifiedMin}:${stringifiedSec}`
    }

    

    render(){
        const {minutes,play}=this.state

        return(
            <div className="main-container">
                <h1 className="heading">Digital Timer</h1>
                <div className="contain">
                    <div className="con1">
                        <div className="con">
                            <p className="time">{this.getStringifiedTime()}</p>
                            <p className="status">{play ? "Running":"Paused"}</p>
                        </div>
                    </div>
                    <div className="con2">
                        <div className="container">
                            <div className="startCon">
                                <button type="button" className="button" onClick={this.onChangePlay}>
                                    <img className="image" src={play ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png": "https://assets.ccbp.in/frontend/react-js/play-icon-img.png"} alt="play icon"/>
                                </button>
                                <p className="start">{play ? "Pause":"Start"}</p>
                            </div>
                            <div className="startCon">
                                <button type="button" className="button" onClick={this.onReset}>
                                    <img className="image" src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png" alt="reset icon"/>
                                </button>
                                <p className="start">Reset</p>
                            </div>
                        </div>
                        <p className="para">Set Timer Limit</p>
                        <div className="set">
                            <button className="minus" type="button" onClick={this.onDecrement}>-</button>
                            <div className="number">
                                <p className="num">{minutes}</p>
                            </div>
                            <button className="minus" type="button" onClick={this.onIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DigitalTimer