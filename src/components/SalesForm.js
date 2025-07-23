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
                        <h2>叉车业务员信息登记</h2>
                        <p>请填写您的客户资源信息，我们将为您匹配服务商</p>
                    </div>
                    
                    <form id="sales-form-data">
                        <div class="form-group">
                            <label for="sales-name">姓名</label>
                            <input type="text" id="sales-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="sales-phone">联系电话</label>
                            <input type="tel" id="sales-phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="sales-region">所在地区</label>
                            <input type="text" id="sales-region" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="sales-industry">客户行业</label>
                            <input type="text" id="sales-industry" class="form-control" placeholder="例如：制造业、物流、仓储等" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="sales-customers">客户规模</label>
                            <select id="sales-customers" class="form-control" required>
                                <option value="">请选择客户规模</option>
                                <option value="small">小型企业（1-10台）</option>
                                <option value="medium">中型企业（11-50台）</option>
                                <option value="large">大型企业（50台以上）</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="sales-notes">客户需求备注</label>
                            <textarea id="sales-notes" class="form-control" placeholder="请描述客户的主要需求和特点..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn" style="width: 100%;">提交信息</button>
                    </form>
                    
                    <div class="success-message" id="sales-success" style="display: none;">
                        <i class="fas fa-check-circle fa-2x"></i>
                        <h3>信息提交成功！</h3>
                        <p>我们将尽快为您匹配服务商</p>
                    </div>
                    
                    <div class="error-message" id="sales-error" style="display: none;">
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
    document.getElementById('sales-form-data').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('sales-name').value;
        const phone = document.getElementById('sales-phone').value;
        const region = document.getElementById('sales-region').value;
        const industry = document.getElementById('sales-industry').value;
        const customers = document.getElementById('sales-customers').value;
        const notes = document.getElementById('sales-notes').value;
        
        try {
            // 提交数据到Supabase
            const { error } = await supabase
                .from('sales')
                .insert([{ 
                    name, 
                    phone, 
                    region, 
                    industry, 
                    customer_size: customers, 
                    notes,
                    created_at: new Date()
                }]);
            
            if (error) throw error;
            
            // 显示成功消息
            document.getElementById('sales-success').style.display = 'block';
            
            // 3秒后返回首页
            setTimeout(() => {
                goToHome();
            }, 3000);
        } catch (error) {
            console.error('提交失败:', error);
            document.getElementById('error-message').textContent = error.message || '请稍后重试';
            document.getElementById('sales-error').style.display = 'block';
        }
    });
}
