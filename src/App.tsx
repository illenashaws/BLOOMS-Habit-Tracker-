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

function App() {
const [selectedUser, setSelectedUser] = useState<User | ''>('')

const [completedHabits, setCompletedHabits] =
useState<HabitProgress>(() => {
const saved = localStorage.getItem('blooms-progress')

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
const saved = localStorage.getItem('blooms-moods')

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
const saved = localStorage.getItem('blooms-notes')

  if (saved) {
    return JSON.parse(saved)
  }

  return {
    Elena: '',
    Ara: '',
    Fio: ''
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

const toggleHabit = (habit: string) => {
if (!selectedUser) return

if (
  completedHabits[selectedUser].includes(habit)
) {
  setCompletedHabits({
    ...completedHabits,
    [selectedUser]:
      completedHabits[selectedUser].filter(
        (h: string) => h !== habit
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
return ( <div className="app"> <h1>🌸 BLOOMS</h1>


    <h2 className="welcome-text">
      Welcome, {selectedUser}!
    </h2>

    <p className="progress-text">
      {completedHabits[selectedUser].length} /{' '}
      {habits[selectedUser].length} Completed
    </p>

    <div className="profile-card">
      {habits[selectedUser].map((habit) => (
        <button
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

    <div className="profile-card">
      <h2>How are you feeling today?</h2>

      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() =>
            setSelectedMood({
              ...selectedMood,
              [selectedUser]: mood
            })
          }
        >
          {mood}
        </button>
      ))}

      <textarea
        placeholder="Mood note (optional)..."
        value={moodNote[selectedUser]}
        onChange={(e) =>
          setMoodNote({
            ...moodNote,
            [selectedUser]: e.target.value
          })
        }
      />

      <p className="progress-text">
        Today's Mood:{' '}
        {selectedMood[selectedUser] || 'None'}
      </p>
    </div>

    <button
      onClick={() => setSelectedUser('')}
    >
      ← Back
    </button>
  </div>
)

}

return ( <div className="app"> <h1>🌸 BLOOMS</h1>

  <p className="subtitle">
    Grow one small habit at a time.
  </p>

  <div className="profile-card">
    <h2>Who's blooming today?</h2>

    <button
      onClick={() => setSelectedUser('Elena')}
    >
      💻 Elena
    </button>

    <button
      onClick={() => setSelectedUser('Ara')}
    >
      🌷 Ara
    </button>

    <button
      onClick={() => setSelectedUser('Fio')}
    >
      🎀 Fio
    </button>
  </div>
</div>

)
}

export default App