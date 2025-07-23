import './styles/main.css';
import { renderHomePage } from './components/HomePage';
import { initSupabase } from './services/supabase';

// 初始化应用
function initApp() {
    // 初始化 Supabase
    initSupabase();
    
    // 渲染首页
    renderHomePage();
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
