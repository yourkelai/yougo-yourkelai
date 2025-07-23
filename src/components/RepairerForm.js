import { goToHome } from './HomePage';
import { supabase } from '../services/supabase';

export function renderForm() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <div id="form-pages">
                <a href="#" class="back-btn" id="back-to-home">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                
                <div class="form-container">
                    <div class="form-header">
                        <h2>叉车维修员信息登记</h2>
                        <p>请填写您的维修技术专长和经验，我们将为您匹配需求</p>
                    </div>
                    
                    <form id="repairer-form-data">
                        <div class="form-group">
                            <label for="repairer-name">姓名</label>
                            <input type="text" id="repairer-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-phone">联系电话</label>
                            <input type="tel" id="repairer-phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-location">所在地区</label>
                            <input type="text" id="repairer-location" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-experience">维修经验（年）</label>
                            <input type="number" id="repairer-experience" class="form-control" min="1" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-specialty">专长领域</label>
                            <select id="repairer-specialty" class="form-control" required>
                                <option value="">请选择您的专长</option>
                                <option value="engine">发动机维修</option>
                                <option value="electrical">电气系统</option>
                                <option value="hydraulic">液压系统</option>
                                <option value="battery">电池与充电系统</option>
                                <option value="full">全车维修</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-brands">擅长维修品牌</label>
                            <input type="text" id="repairer-brands" class="form-control" placeholder="例如：丰田、林德、杭叉等">
                        </div>
                        
                        <div class="form-group">
                            <label for="repairer-desc">自我介绍</label>
                            <textarea id="repairer-desc" class="form-control" placeholder="请简要介绍您的维修经验和技术特点..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn" style="width: 100%;">提交信息</button>
                    </form>
                    
                    <div class="success-message" id="repairer-success" style="display: none;">
                        <i class="fas fa-check-circle fa-2x"></i>
                        <h3>信息提交成功！</h3>
                        <p>我们将尽快审核您的信息并与您联系</p>
                    </div>
                    
                    <div class="error-message" id="repairer-error" style="display: none;">
                        <i class="fas fa-exclamation-triangle fa-2x"></i>
                        <h3>提交失败！</h3>
                        <p id="error-message">请稍后重试</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 返回首页按钮
    document.getElementById('back-to-home').addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
    });

    // 表单提交
    document.getElementById('repairer-form-data').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('repairer-name').value;
        const phone = document.getElementById('repairer-phone').value;
        const location = document.getElementById('repairer-location').value;
        const experience = document.getElementById('repairer-experience').value;
        const specialty = document.getElementById('repairer-specialty').value;
        const brands = document.getElementById('repairer-brands').value;
        const desc = document.getElementById('repairer-desc').value;
        
        try {
            // 提交数据到Supabase
            const { error } = await supabase
                .from('repairers')
                .insert([{ 
                    name, 
                    phone, 
                    location, 
                    experience: parseInt(experience),
                    specialty, 
                    brands, 
                    description: desc,
                    created_at: new Date()
                }]);
            
            if (error) throw error;
            
            // 显示成功消息
            document.getElementById('repairer-success').style.display = 'block';
            
            // 3秒后返回首页
            setTimeout(() => {
                goToHome();
            }, 3000);
        } catch (error) {
            console.error('提交失败:', error);
            document.getElementById('error-message').textContent = error.message || '请稍后重试';
            document.getElementById('repairer-error').style.display = 'block';
        }
    });
}
