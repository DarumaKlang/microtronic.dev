import fs from 'fs';
import path from 'path';

const walkSync = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkSync(filepath, callback);
        } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
            callback(filepath);
        }
    });
};

const dirs = ['./app', './components'];

dirs.forEach(dir => {
    walkSync(dir, (filepath) => {
        let content = fs.readFileSync(filepath, 'utf-8');
        let modified = false;

        // Global replacements
        if (content.includes('bg-gradient-to-')) {
            content = content.replace(/bg-gradient-to-/g, 'bg-linear-to-');
            modified = true;
        }
        if (content.includes('pt-[120px] pb-[100px]')) {
            content = content.replace(/pt-\[120px\] pb-\[100px\]/g, 'pt-32 pb-24');
            modified = true;
        }
        if (content.includes('z-[60]')) {
            content = content.replace(/z-\[60\]/g, 'z-50');
            modified = true;
        }
        if (content.includes('min-h-[300px]')) {
            content = content.replace(/min-h-\[300px\]/g, 'min-h-80');
            modified = true;
        }
        if (content.includes('rounded-[2rem]')) {
            content = content.replace(/rounded-\[2rem\]/g, 'rounded-3xl');
            modified = true;
        }
        if (content.includes('min-h-[3.5rem]')) {
            content = content.replace(/min-h-\[3\.5rem\]/g, 'min-h-14');
            modified = true;
        }
        
        // Specific file replacements
        if (filepath.replace(/\\/g, '/').endsWith('components/ProductFilterGlass.tsx')) {
            if (content.includes('className="flex items-center gap-3 px-6 py-3 border-r border-white/10 hidden md:flex"')) {
                content = content.replace('className="flex items-center gap-3 px-6 py-3 border-r border-white/10 hidden md:flex"', 'className="items-center gap-3 px-6 py-3 border-r border-white/10 hidden md:flex"');
                modified = true;
            }
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/ProductGrid.tsx')) {
            if (content.includes('<img\n                                src={product.preview_image_url || \'/placeholder.jpg\'}\n                                alt={`Preview of ${product.name}`}\n                                loading="lazy"\n                                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"\n                            />')) {
                content = content.replace(
                    '<img\n                                src={product.preview_image_url || \'/placeholder.jpg\'}\n                                alt={`Preview of ${product.name}`}\n                                loading="lazy"\n                                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"\n                            />',
                    '<Image\n                                src={product.preview_image_url || \'/placeholder.jpg\'}\n                                alt={`Preview of ${product.name}`}\n                                fill\n                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"\n                                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"\n                            />'
                );
                modified = true;
            }
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/GooeyBackground.tsx')) {
            content = content.replace(/w-\[200px\] h-\[200px\] sm:w-\[500px\] sm:h-\[500px\]/g, 'w-64 h-64 sm:w-96 sm:h-96');
            content = content.replace(/blur-\[150px\]/g, 'blur-3xl');
            
            content = content.replace(/w-\[240px\] h-\[240px\] sm:w-\[600px\] sm:h-\[600px\]/g, 'w-64 h-64 sm:w-[400px] sm:h-[400px]');
            content = content.replace(/blur-\[180px\]/g, 'blur-3xl');
            
            content = content.replace(/w-\[180px\] h-\[180px\] sm:w-\[450px\] sm:h-\[450px\]/g, 'w-48 h-48 sm:w-80 sm:h-80');
            content = content.replace(/blur-\[160px\]/g, 'blur-3xl');
            
            content = content.replace(/w-\[280px\] h-\[280px\] sm:w-\[700px\] sm:h-\[700px\]/g, 'w-72 h-72 sm:w-[500px] sm:h-[500px]');
            content = content.replace(/blur-\[200px\]/g, 'blur-3xl');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/SustainabilitySection.tsx')) {
            content = content.replace(/w-\[800px\] h-\[400px\] blur-\[120px\]/g, 'w-full h-full sm:w-96 sm:h-96 blur-3xl');
            content = content.replace(/w-\[98%\]/g, 'w-full');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/ROICalculator.tsx')) {
            content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-white/5');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/FloatingMicroAd.tsx')) {
            content = content.replace(/max-w-\[320px\] w-\[90vw\]/g, 'max-w-xs w-full');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/AIChatbot.tsx')) {
            content = content.replace(/h-\[500px\]/g, 'h-[80vh]');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('app/service/page.tsx')) {
            content = content.replace(/opacity-\[0\.03\]/g, 'opacity-5');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('components/StrategicTicker.tsx')) {
            content = content.replace(/text-\[10px\]/g, 'text-xs');
            modified = true;
        }
        
        if (filepath.replace(/\\/g, '/').endsWith('app/pricing/page.tsx')) {
            content = content.replace(/\s*\/\/\s*แก้ไข\s+class\s+'bg-linear-to-br'\s+เป็น\s+'bg-gradient-to-br'\s*\n/g, '\n');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filepath, content, 'utf-8');
            console.log('Modified:', filepath);
        }
    });
});
