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
                        <h2>叉车供应商信息登记</h2>
                        <p>请填写您的供应信息，我们将为您匹配需求客户</p>
                    </div>
                    
                    <form id="supplier-form-data">
                        <div class="form-group">
                            <label for="supplier-name">联系人姓名</label>
                            <input type="text" id="supplier-name" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-phone">联系电话</label>
                            <input type="tel" id="supplier-phone" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-company">公司名称</label>
                            <input type="text" id="supplier-company" class="form-control" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-type">供应类型</label>
                            <select id="supplier-type" class="form-control" required>
                                <option value="">请选择供应类型</option>
                                <option value="vehicle">整车供应</option>
                                <option value="parts">配件供应</option>
                                <option value="both">整车+配件</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-brands">供应品牌</label>
                            <input type="text" id="supplier-brands" class="form-control" placeholder="例如：丰田、林德、杭叉等" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-products">主要产品</label>
                            <textarea id="supplier-products" class="form-control" placeholder="请列出您的主要产品和服务..." required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="supplier-region">供应区域</label>
                            <input type="text" id="supplier-region" class="form-control" placeholder="例如：全国、华东地区等" required>
                        </div>
                        
                        <button type="submit" class="btn" style="width: 100%;">提交信息</button>
                    </form>
                    
                    <div class="success-message" id="supplier-success" style="display: none;">
                        <i class="fas fa-check-circle fa-2x"></i>
                        <h3>信息提交成功！</h3>
                        <p>我们将尽快为您匹配需求客户</p>
                    </div>
                    
                    <div class="error-message" id="supplier-error" style="display: none;">
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
    document.getElementById('supplier-form-data').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('supplier-name').value;
        const phone = document.getElementById('supplier-phone').value;
        const company = document.getElementById('supplier-company').value;
        const type = document.getElementById('supplier-type').value;
        const brands = document.getElementById('supplier-brands').value;
        const products = document.getElementById('supplier-products').value;
        const region = document.getElementById('supplier-region').value;
        
        try {
            // 提交数据到Supabase
            const { error } = await supabase
                .from('suppliers')
                .insert([{ 
                    name, 
                    phone, 
                    company, 
                    supply_type: type, 
                    brands, 
                    products, 
                    region,
                    created_at: new Date()
                }]);
            
            if (error) throw error;
            
            // 显示成功消息
            document.getElementById('supplier-success').style.display = 'block';
            
            // 3秒后返回首页
            setTimeout(() => {
                goToHome();
            }, 3000);
        } catch (error) {
            console.error('提交失败:', error);
            document.getElementById('error-message').textContent = error.message || '请稍后重试';
            document.getElementById('supplier-error').style.display = 'block';
        }
    });
}
