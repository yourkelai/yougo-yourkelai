export function renderHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <div id="home-page">
                <div class="header">
                    <h1>叉车服务平台</h1>
                    <p>连接叉车行业专业人士，提供维修、配件、整车供应和客户资源对接服务</p>
                </div>
                
                <div class="cards-container">
                    <div class="role-card repairer" data-role="repairer">
                        <div class="role-icon">
                            <i class="fas fa-tools"></i>
                        </div>
                        <h3>叉车维修员</h3>
                        <p>能独立维修、想创业做老板，怕没客户会亏钱；“你可来”这里，专业匹配叉车大客户，长期稳定圆老板梦！</p>
                        <button class="btn">提交信息</button>
                    </div>
                    
                    <div class="role-card manager" data-role="manager">
                        <div class="role-icon">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <h3>叉车管理者</h3>
                        <p>想轻松高效管理叉车，怕叉车维保费用不断上升；“你可来”这里，精准费用控制，至少降低10%或以上！</p>
                        <button class="btn">提交需求</button>
                    </div>
                    
                    <div class="role-card supplier" data-role="supplier">
                        <div class="role-icon">
                            <i class="fas fa-truck-loading"></i>
                        </div>
                        <h3>叉车供应商</h3>
                        <p>想长期大量供应叉车配件，怕收钱难掉业务；“你可来”这里，不断扩大的闭环需求链，长期稳定好收钱！</p>
                        <button class="btn">提供供应</button>
                    </div>
                    
                    <div class="role-card sales" data-role="sales">
                        <div class="role-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <h3>叉车业务员</h3>
                        <p>知道大量叉车客户资源，却无力变现；“你可来”这里，大量优质产品和服务提供商等你一起快速赚钱！</p>
                        <button class="btn">提交资源</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2025 “你可来”叉车服务平台 | 连接叉车行业专业人士</p>
        </div>
    `;

    // 添加角色卡片事件监听
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', () => {
            const role = card.getAttribute('data-role');
            import(`./${role.charAt(0).toUpperCase() + role.slice(1)}Form.js`)
                .then(module => module.renderForm());
        });
    });
}

// 全局返回首页函数
export function goToHome() {
    renderHomePage();
}
