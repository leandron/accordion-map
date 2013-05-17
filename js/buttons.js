C = 0;
Cs = 1;
D = 2;
Ds = 3;
E = 4;
F = 5;
Fs = 6;
G = 7;
Gs = 8;
A = 9;
As = 10;
B = 11;

int_tone = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
br_tone = ['Dó', 'Dó#', 'Ré', 'Ré#', 'Mi', 'Fá', 'Fá#', 'Sol', 'Sol#', 'Lá', 'Lá#', 'Si'];

/* keymap */

HOHNER_GC_OPEN =  [[G, B, D, F, G, B, D, F, G, B], [D, Fs, A, C, E, Fs, A, C, E, Fs, A]];
HOHNER_GC_CLOSE = [[E, G, C, E, G, C, E, G, C, E], [B, D,  G, B, D, G,  B, D, G, B,  D]];
HOHNER_GC = [HOHNER_GC_OPEN, HOHNER_GC_CLOSE]

OPEN = 0;
CLOSE = 1;

/* chords */

/* [chord_name, 'complement', OPEN/CLOSE, [[row,key],[row,key]...], 'obs'] */

chords = [
    [C, 'M', [
        [CLOSE, [[1,2],[1,3],[1,4]]],
        [CLOSE, [[1,5],[1,6],[1,7]]],
        [OPEN, [[2,3],[2,4],[1,4]]],
        [OPEN, [[2,7],[2,8],[1,8]]],
        ]
    ],
    [D, 'M', [
        [OPEN, [[2,0],[2,1],[2,2],[1,2]]],
        [OPEN, [[2,5],[2,6],[1,6]]],
        [OPEN, [[2,9],[2,10]]],
        ]
    ],
    [D, 'm', [
        [OPEN, [[2,2],[1,2],[1,3]]],
        [OPEN, [[2,6],[1,6],[1,7]]],
        ]
    ]
];


function fill_row(my_div, max_buttons) {
    for (var i=1; i <= max_buttons; i++) {
        up_btn = "<p id=\"" + my_div + "_btn_" + i + "_up\" class=\"acc_label_up\"> A </p>";
        down_btn = "<p id=\"" + my_div + "_btn_" + i + "_down\"  class=\"acc_label_down\"> B </p>";
        div_str = "<div class=\"acc_button\" id=\"" + my_div + "_btn_" + i + "\"> " + up_btn + down_btn + " </div>";
        $("#" + my_div).append(div_str);
    }
}

function get_button_obj (row, button_number) {
    return $("#row_" + row + "_btn_" + button);
}

function set_button_label_up (row, button, label) {
    $("#row_" + row + "_btn_" + button + "_up").text(label);
}

function set_button_label_down (row, button, label) {
    $("#row_" + row + "_btn_" + button + "_down").text(label);
}

function set_tone(tones, tone_adjust, tone_labels) {
    up_row = 0;
    bottom_row = 1;

    up_row_length = tones[OPEN][up_row].length;
    for(var i=0; i < up_row_length; i++) {
        bottom_label_idx = (tones[OPEN][up_row][i] + tone_adjust) % int_tone.length;
        up_label_idx = (tones[CLOSE][up_row][i] + tone_adjust) % int_tone.length;
        
        set_button_label_up(1, (i+1), tone_labels[up_label_idx]);
        set_button_label_down(1, (i+1), tone_labels[bottom_label_idx]);
    }

    bottom_row_len = tones[OPEN][bottom_row].length;
    for(var i=0; i < bottom_row_len; i++) {
        up_label_idx = (tones[OPEN][bottom_row][i] + tone_adjust) % int_tone.length;
        bottom_label_idx = (tones[CLOSE][bottom_row][i] + tone_adjust) % int_tone.length;
        
        set_button_label_up(2, (i+1), tone_labels[up_label_idx]);
        set_button_label_down(2, (i+1), tone_labels[bottom_label_idx]);
    }

}
