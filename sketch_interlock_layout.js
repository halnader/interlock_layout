let scale_val = 4;

let total_len = 67; //top dimension
let total_wid = 25*12; // side dimension

let canvas_l = 500;
let canvas_w = 1500;

const beside = true;
const under = false;
const landscape = true;
const portrait = false;

let small_rect_block = [7.5 * scale_val, 15* scale_val]
let square_block = [15*scale_val,15*scale_val]
let large_rect_block = [15*scale_val,22.5*scale_val]

let right_shift_button;
let left_shift_button;
let up_shift_button;
let down_shift_button;

let save_button;

let vertical_offset = 0;
let horizontal_offset = 0;

let offset = (square_block[0]/2);

function setup() {
  //createCanvas(total_len * scale_val, 700);
  createCanvas(canvas_l, canvas_w);
  //noLoop();
  right_shift_button = createButton('right');
  left_shift_button = createButton('left');
  up_shift_button = createButton('up');
  down_shift_button = createButton('down');
  
  save_button = createButton('save');
  
  let center_coord = [(canvas_l - total_len*scale_val)/2 + total_len*scale_val, total_wid*scale_val/2];
  let button_pad = 25;
  
  right_shift_button.position(center_coord[0]+button_pad, center_coord[1]);
  left_shift_button.position(center_coord[0]-button_pad, center_coord[1]);
  up_shift_button.position(center_coord[0], center_coord[1]-button_pad);
  down_shift_button.position(center_coord[0], center_coord[1]+button_pad);
  
  save_button.position(center_coord[0], center_coord[1]+4*button_pad);
  
  right_shift_button.mousePressed(shift_right_fun);
  left_shift_button.mousePressed(shift_left_fun);
  up_shift_button.mousePressed(shift_up_fun);
  down_shift_button.mousePressed(shift_down_fun);
  
  save_button.mousePressed(save_button_fun);
}

function shift_right_fun() {
  horizontal_offset += offset;
}
function shift_left_fun() {
  horizontal_offset -= offset;
}
function shift_up_fun() {
  vertical_offset -= offset;
}
function shift_down_fun() {
  vertical_offset += offset;
}

function save_button_fun() {
  saveCanvas('interlock_pattern', 'png');
}

function draw_outline_block(x, y){
  fill('grey');
  stroke('black');
  rect(x,y,small_rect_block[0], small_rect_block[1]);
}

function draw_small_rect_block(x, y, o, b, g=true){
  fill('bisque');
  stroke('black');
  let l = -1*small_rect_block[0];
  let w = 1*small_rect_block[1];
  if (o){
    l = -1*small_rect_block[1];
    w = 1*small_rect_block[0];
  }
  if(g){
    rect(x,y,l,w);
  }
  
  if(b){
    return [l, 0]; 
  } else {
    return [0, w]
  }
}

function draw_square_block(x, y, b, g=true){
  fill('antiquewhite');
  stroke('black');
  let l = -1*square_block[0];
  let w = square_block[1];
  if(g){
    rect(x,y,l,w);
  }
  if(b){
    return [l, 0]; 
  } else {
    return [0, w]
  }
}

function draw_large_rect_block(x, y, o, b, g=true){
  fill('beige');
  stroke('black');
  let l = -1*large_rect_block[0];
  let w = large_rect_block[1];
  if (o){
    l = -1*large_rect_block[1];
    w = large_rect_block[0];
  }
  if(g){
    rect(x,y,l,w);
  }
  
  if(b){
    return [l, 0]; 
  } else {
    return [0, w]
  }
}

function draw_puzzle_piece(curr_x, curr_y){
  let r = [0,0];
  r = draw_large_rect_block(curr_x, curr_y, portrait, beside);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_square_block(curr_x, curr_y, under);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_square_block(curr_x, curr_y, under);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_small_rect_block(curr_x, curr_y, landscape, beside);
  curr_x += r[0];
  curr_y += r[1];
  
  curr_x += offset*3;
  curr_y -= offset;
  
  r = draw_small_rect_block(curr_x, curr_y, portrait, under);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_large_rect_block(curr_x, curr_y, landscape, under);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_square_block(curr_x, curr_y, under);
  curr_x += r[0];
  curr_y += r[1];
  
  r = draw_small_rect_block(curr_x, curr_y, landscape, under);
  curr_x += r[0];
  curr_y += r[1];
  
  return [curr_x+offset, curr_y];
  
}

function draw() {
  background(220);
  
  let offset = square_block[0]/2;
  let ref_y = 0 + vertical_offset;
  let ref_x = total_len * scale_val + offset*2 + horizontal_offset;
  //let ref_x = 800;
  
  curr_x = ref_x;
  curr_y = ref_y;
  
  //let r = draw_puzzle_piece(curr_x, curr_y);
  
  //curr_x = r[0];
  //curr_y = r[1];
  
  for (let i = 0; i < 12; i++){
    
    for (let j = 0; j < 6; j++){
      r = draw_puzzle_piece(curr_x, curr_y);
      curr_x = r[0];
      curr_y = r[1]; 
    }
    curr_x = ref_x - offset*3*(i+1);
    if ((i+1)%4){
      curr_y = ref_y - offset*3*((i+1)%4);
    } else {
      ref_y -= offset*2
      curr_y = ref_y;
    }
    
  }
  
  curr_x = 0;
  curr_y = 0;
  while(curr_y < total_wid * scale_val){
    draw_outline_block(curr_x, curr_y);
    curr_y += small_rect_block[1];
  }
  
  fill('dimgrey');
  rect(total_len * scale_val, 0, canvas_l, canvas_w);
  
    fill('ivory');
  rect(0, total_wid*scale_val, canvas_l, canvas_w - total_wid*scale_val);
  
}