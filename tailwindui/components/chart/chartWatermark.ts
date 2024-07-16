import { Plugin } from 'chart.js';

const plugin: Plugin = {
    id: 'water_mark_plugin',
    afterDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        const height = ctx.canvas.clientHeight;
        const width = ctx.canvas.clientWidth;
        ctx.fillStyle = "rgba(0, 0, 0, .12)"
        ctx.font = "15px bold sans-serif";
        let text = "Created with ChatCharts";
        if (options.text) {
            text = options.text;
        }
        const textSize = ctx.measureText(text);
        for (let y = -30; y < height + 10; y += textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent + 60) {
            for (let x = -30 - 2 * y; x < width + 10; x += textSize.width + 30) {
                ctx.fillText(text, x, y);
            }
        }
        ctx.restore();
    },
    defaults: {}
}

export default plugin;
