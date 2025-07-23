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
                        <h2>叉车配件与维修需求</h2>
                        <p>请填写您的需求信息，我们将为您匹配专业服务商</p>
                    </div>
                    
                    <form id="manager-form-data">
                        <div class="form-group">
                            <label for="manager-name">联系人姓名</label>
                            <input type="text" id="manager-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-phone">联系电话</label>
                            <input type="tel" id="manager-phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-company">公司名称</label>
                            <input type="text" id="manager-company" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-type">需求类型</label>
                            <select id="manager-type" class="form-control" required>
                                <option value="">请选择需求类型</option>
                                <option value="parts">配件采购</option>
                                <option value="repair">维修服务</option>
                                <option value="both">配件+维修</option>
                                <option value="consult">技术咨询</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-brands">叉车品牌</label>
                            <input type="text" id="manager-brands" class="form-control" placeholder="例如：丰田、林德、杭叉等" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-models">叉车型号</label>
                            <input type="text" id="manager-models" class="form-control" placeholder="请填写具体型号">
                        </div>
                        
                        <div class="form-group">
                            <label for="manager-details">需求描述</label>
                            <textarea id="manager-details" class="form-control" placeholder="请详细描述您的需求，如配件名称、故障现象、数量等..." required></textarea>
                        </div>
                        
                        <button type="submit" class="btn" style="width: 100%;">提交需求</button>
                    </form>
                    
                    <div class="success-message" id="manager-success" style="display: none;">
                        <i class="fas fa-check-circle fa-2x"></i>
                        <h3>需求提交成功！</h3>
                        <p>我们将尽快为您匹配服务商并联系您</p>
                    </div>
                    
                    <div class="error-message" id="manager-error" style="display: none;">
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
    document.getElementById('manager-form-data').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('manager-name').value;
        const phone = document.getElementById('manager-phone').value;
        const company = document.getElementById('manager-company').value;
        const type = document.getElementById('manager-type').value;
        const brands = document.getElementById('manager-brands').value;
        const models = document.getElementById('manager-models').value;
        const details = document.getElementById('manager-details').value;
        
        try {
            // 提交数据到Supabase
            const { error } = await supabase
                .from('managers')
                .insert([{ 
                    name, 
                    phone, 
                    company, 
                    demand_type: type, 
                    brands, 
                    models, 
                    details,
                    created_at: new Date()
                }]);
            
            if (error) throw error;
            
            // 显示成功消息
            document.getElementById('manager-success').style.display = 'block';
            
            // 3秒后返回首页
            setTimeout(() => {
                goToHome();
            }, 3000);
        } catch (error) {
            console.error('提交失败:', error);
            document.getElementById('error-message').textContent = error.message || '请稍后重试';
            document.getElementById('manager-error').style.display = 'block';
        }
    });
}
