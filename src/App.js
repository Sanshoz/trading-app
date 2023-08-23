/* cjilru1r01qpo4j4ppcgcjilru1r01qpo4j4ppd0*/
import {StockOverviewPage} from './StockOverviewPage'
import {StockDetailPage} from './stockDetailpage'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path="/detail/:symbol" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

