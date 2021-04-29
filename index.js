import { avrInstruction, CPU, AVRUSART, usart0Config } from "avr8js";
import fetch from 'node-fetch';
import fs from 'fs';

void async function () {
  const sketch = await fs.promises.readFile('nmea-checksum.ino', 'utf-8');
  const req = await fetch('https://hexi.wokwi.com/build', {
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ sketch }),
    method: 'POST',
  });
  const { hex, stdout, stderr } = await req.json();
  console.log('compiler output', stderr || stdout);
  const program = new Uint16Array(0x8000);
  loadHex(hex, new Uint8Array(program.buffer));
  const cpu = new CPU(program);
  const usart = new AVRUSART(cpu, usart0Config, 16e6);
  usart.onByteTransmit = (value) => {
    console.log(value, String.fromCharCode(value));
  };

  for (; ;) {
    avrInstruction(cpu);
    cpu.tick();
    if (cpu.cycles % 500000 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}()

function loadHex(source, target) {
  for (const line of source.split('\n')) {
    if (line[0] === ':' && line.substr(7, 2) === '00') {
      const bytes = parseInt(line.substr(1, 2), 16);
      const addr = parseInt(line.substr(3, 4), 16);
      for (let i = 0; i < bytes; i++) {
        target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
      }
    }
  }
}
