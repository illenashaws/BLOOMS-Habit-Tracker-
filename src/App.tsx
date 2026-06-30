import { useState, useEffect } from 'react'
import './App.css'

const habits = {
  Elena: [
    'Morning Routine',
    'Breakfast',
    'Creative Projects',
    'Semester Preparation',
    'Break Time',
    'Family Time',
    'Exercise',
    'Night Shower',
    'Prepare For Tomorrow',
    'Sleep On Time'
  ],

  Ara: [
    'Morning Shower',
    'Morning Skincare',
    'Brunch',
    '2000 Steps Walking',
    'Read 10 Pages (or More)',
    'Do Homework (If There Is Any)',
    'Research Something New and Discuss with AI',
    'Drink Water',
    'Mandarin Practice',
    'Helping Bunda',
    'Night Shower',
    'Night Skincare'
  ],

  Fio: [
    'Morning Shower',
    'Wash Face and Brush Teeth',
    'Brunch',
    'Walk 3000 Steps',
    'Read a Book',
    'English Practice',
    'Mandarin Practice',
    'Study / Do Schoolwork',
    'Help with Household Chores',
    'Drink Water',
    'Dinner',
    'Spend Time with Family',
    'Hobby Time',
    'Night Shower'
  ]
}

type User = keyof typeof habits

const moods = [
  '😁 Happy',
  '🤩 Excited',
  '😌 Relaxed',
  '😐 Neutral',
  '😔 Sad',
  '😡 Angry',
  '😫 Stressed',
  '😴 Tired'
]

type HabitProgress = {
  Elena: string[]
  Ara: string[]
  Fio: string[]
}

type MoodData = {
  Elena: string
  Ara: string
  Fio: string
}

type NoteData = {
  Elena: string
  Ara: string
  Fio: string
}

type StreakData = {
  Elena: number
  Ara: number
  Fio: number
}

function App() {
  const [selectedUser, setSelectedUser] =
    useState<User | ''>('')

  const [completedHabits, setCompletedHabits] =
    useState<HabitProgress>(() => {
      const saved =
        localStorage.getItem('blooms-progress')

      if (saved) {
        return JSON.parse(saved)
      }

      return {
        Elena: [],
        Ara: [],
        Fio: []
      }
    })

  const [selectedMood, setSelectedMood] =
    useState<MoodData>(() => {
      const saved =
        localStorage.getItem('blooms-moods')

      if (saved) {
        return JSON.parse(saved)
      }

      return {
        Elena: '',
        Ara: '',
        Fio: ''
      }
    })

  const [moodNote, setMoodNote] =
    useState<NoteData>(() => {
      const saved =
        localStorage.getItem('blooms-notes')

      if (saved) {
        return JSON.parse(saved)
      }

      return {
        Elena: '',
        Ara: '',
        Fio: ''
      }
    })

  const [streaks, setStreaks] =
    useState<StreakData>(() => {
      const saved =
        localStorage.getItem('blooms-streaks')

      if (saved) {
        return JSON.parse(saved)
      }

      return {
        Elena: 0,
        Ara: 0,
        Fio: 0
      }
    })

  useEffect(() => {
    localStorage.setItem(
      'blooms-progress',
      JSON.stringify(completedHabits)
    )
  }, [completedHabits])

  useEffect(() => {
    localStorage.setItem(
      'blooms-moods',
      JSON.stringify(selectedMood)
    )
  }, [selectedMood])

  useEffect(() => {
    localStorage.setItem(
      'blooms-notes',
      JSON.stringify(moodNote)
    )
  }, [moodNote])

  useEffect(() => {
    localStorage.setItem(
      'blooms-streaks',
      JSON.stringify(streaks)
    )
  }, [streaks])

  const toggleHabit = (habit: string) => {
    if (!selectedUser) return

    if (
      completedHabits[selectedUser].includes(
        habit
      )
    ) {
      setCompletedHabits({
        ...completedHabits,
        [selectedUser]:
          completedHabits[selectedUser].filter(
            (h) => h !== habit
          )
      })
    } else {
      setCompletedHabits({
        ...completedHabits,
        [selectedUser]: [
          ...completedHabits[selectedUser],
          habit
        ]
      })
    }
  }

  if (selectedUser) {
    const completed = completedHabits[selectedUser].length
    const total = habits[selectedUser].length
    const percentage = Math.round((completed / total) * 100)
    return (
      <div className="app">
        <h1>🌸 BLOOMS</h1>

        <h2 className="welcome-text">
          Welcome, {selectedUser}!
        </h2>

        <p className="progress-text">
          🌸 {completed} / {total} Completed
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`
            }}
          ></div>
        </div>

        <p className="progress-percent">
          {percentage}% Complete
        </p>

        <p className="progress-text">
          🔥 Streak:{' '}
          {streaks[selectedUser]} Days
        </p>

        <button
          onClick={() =>
            setStreaks({
              ...streaks,
              [selectedUser]:
                streaks[selectedUser] + 1
            })
          }
        >
          🔥 Increase Streak
        </button>

        <div className="profile-card">
          <div className="habit-grid">
             {habits[selectedUser].map((habit) => (
              <button
               className="habit-button"
               key={habit}
               onClick={() => toggleHabit(habit)}
             >
               {completedHabits[selectedUser].includes(habit)
                  ? '☑'
                   : '☐'}{' '}
                  {habit}
                </button>
              ))}
            </div>
          </div>

        <div className="profile-card">
          <h2>
            How are you feeling today?
          </h2>

          <div className="mood-grid">
            {moods.map((mood) => {
              const [emoji, label] = mood.split(' ')

              return (
                <button
                  className="mood-card"
                  key={mood}
                  onClick={() =>
                    setSelectedMood({
                      ...selectedMood,
                      [selectedUser]: mood
                    })
                  }
                >
                  <span className="mood-emoji">
                    {emoji}
                  </span>

                  <span className="mood-label">
                    {label}
                  </span>
                </button>
              )
            })}
          </div>

          <textarea
            placeholder="Mood note (optional)..."
            value={moodNote[selectedUser]}
            onChange={(e) =>
              setMoodNote({
                ...moodNote,
                [selectedUser]:
                  e.target.value
              })
            }
          />

          <p className="progress-text">
            Today's Mood:{' '}
            {selectedMood[selectedUser] ||
              'None'}
          </p>
        </div>

        <button
          onClick={() =>
            setSelectedUser('')
          }
        >
          ← Back
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>🌸 BLOOMS</h1>

      <p className="subtitle">
        Grow one small habit at a time.
      </p>

      <div className="profile-card">
        <h2>Who's blooming today?</h2>

        <button
          onClick={() =>
            setSelectedUser('Elena')
          }
        >
          💻 Elena
        </button>

        <button
          onClick={() =>
            setSelectedUser('Ara')
          }
        >
          🌷 Ara
        </button>

        <button
          onClick={() =>
            setSelectedUser('Fio')
          }
        >
          🎀 Fio
        </button>
      </div>
    </div>
  )
}

export default App