import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AvatarEditor from './components/AvatarEditor'

import '@fontsource/noto-sans-kr'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AvatarEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
