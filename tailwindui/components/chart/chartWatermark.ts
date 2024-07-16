import { getBrand } from '@/utils/getHost';
import { Plugin } from 'chart.js';

const plugin: Plugin = {
    id: 'water_mark_plugin',
    afterDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        const height = ctx.canvas.clientHeight;
        const width = ctx.canvas.clientWidth;
        ctx.fillStyle = "rgba(0, 0, 0, .12)"
        const text = options.text;
        const textSize = ctx.measureText(text);

        if (options.style === "repeat") {
            ctx.font = "bold 15px Inter,sans-serif";
            const layerHeight = textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent + 60;
            const halfGap = 25;
            for (let _y = 0; _y * layerHeight < height + 200; _y += 1) {
                const y = _y * layerHeight
                for (let x = (_y % 2) * (-textSize.width - halfGap); x < width + 50; x += textSize.width * 2 + halfGap * 2) {
                    ctx.fillText(text, x, 10 + y);
                }
            }
        } else if (options.style === "single") {
            ctx.font = "bold 30px Inter,sans-serif";
            ctx.fillText(text, 10, height - (textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent) - 10);
        }
        
        ctx.restore();
    },
    defaults: {
        text: "Created with " + getBrand(),
        style: "single"
    }
}

export default plugin;
