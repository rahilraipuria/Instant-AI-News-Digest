import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function Quiz({quizData}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (quizData.length === 0) {
        setError("No quiz questions available.")
      } else {
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentQuestion] = selectedAnswer
      return newAnswers
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowScore(true)
    }
  }

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].answer ? 1 : 0)
    }, 0)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers([])
    setShowScore(false)
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center">Loading quiz...</p>
        </CardContent>
      </Card>
    )
  }

 

  if (showScore) {
    const score = calculateScore()
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold text-center">
            You scored {score} out of {quizData.length}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={resetQuiz} className="w-full">Restart Quiz</Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuizQuestion = quizData[currentQuestion]

  if (!currentQuizQuestion) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load question. Please try again.</AlertDescription>
      </Alert>
    )
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Question {currentQuestion + 1}/{quizData.length}</span>
          <span className="text-sm font-normal">Progress: {Math.round(progress)}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress value={progress} className="mb-4" />
        <p className="text-sm mb-3">{currentQuizQuestion.question}</p>
        <RadioGroup
          value={userAnswers[currentQuestion] || ""}
          onValueChange={handleAnswerSelect}
          className="space-y-2"
        >
          {[
            currentQuizQuestion.option1,
            currentQuizQuestion.option2,
            currentQuizQuestion.option3,
            currentQuizQuestion.option4
          ].map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-sm">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={handleNextQuestion} 
          disabled={!userAnswers[currentQuestion]}
          className="w-full text-sm py-1"
        >
          {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  )
}

