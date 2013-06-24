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

HOHNER_GC_OPEN =  [[D, Fs, A, C, E, Fs, A, C, E, Fs, A], [G, B, D, F, G, B, D, F, G, B]];
HOHNER_GC_CLOSE = [[B, D,  G, B, D, G,  B, D, G, B,  D], [E, G, C, E, G, C, E, G, C, E]];
HOHNER_GC = [HOHNER_GC_OPEN, HOHNER_GC_CLOSE]

OPEN = 0;
CLOSE = 1;

// chords array constants
c_variations = 2;
c_symbol = 0;

/* chords */

/* [chord_name, 'complement', OPEN/CLOSE, [[row,key],[row,key]...], 'obs'] */

chords = [
    [C, '', [
        [CLOSE, [[0,2],[0,3],[0,4]],''],
        [CLOSE, [[0,5],[0,6],[0,7]],''],
        [OPEN, [[1,3],[1,4],[0,4]],''],
        [OPEN, [[1,7],[1,8],[0,8]],''],
        ]
    ],
    [D, '', [
        [OPEN, [[1,0],[1,1],[1,2]],''],
        [OPEN, [[0,2],[1,5],[1,6]],''],
        [OPEN, [[0,6],[1,9],[1,10]],''],
        ]
    ],
    [D, 'm', [
        [OPEN, [[0,2],[0,3],[1,6]],''],
        [OPEN, [[0,6],[0,7],[1,10]],''],
        ]
    ],
    [E, '7', [
        [CLOSE, [[0,3],[1,3],[1,4]],''],
        [CLOSE, [[0,6],[1,6],[1,7]],''],
        [CLOSE, [[0,9],[1,9],[1,10]],''],
        ]
    ],
    [E, 'm', [
        [CLOSE, [[0,3],[0,4],[1,6]],''],
        [OPEN,  [[1,4],[0,4],[0,5]],''],
        [CLOSE, [[0,6],[0,7],[1,8]],''],
        [OPEN,  [[1,8],[0,8],[0,9]],''],
        ]
    ],
    [F, '', [
        [OPEN,  [[1,2],[1,3],[0,3]],''],
        [OPEN,  [[1,6],[1,7],[0,7]],''],
        ]
    ],
    [G, '', [
        [OPEN,  [[0,0],[0,1],[0,2]],''],
        [CLOSE, [[1,2],[1,3],[1,4]],''],
        [OPEN,  [[0,4],[0,5],[0,6]],''],
        [CLOSE, [[1,5],[1,6],[1,7]],''],
        [CLOSE, [[1,8],[1,9],[1,10]],''],
        ]
    ],
    [A, 'm', [
        [OPEN,  [[1,2],[1,3],[1,4]],''],
        [OPEN,  [[1,6],[1,7],[1,8]],''],
        ]
    ],
];

function clear_chords () {
    for (i = 0; i < HOHNER_GC_OPEN[0].length; i++) {
        $("#row_0_btn_" + i).removeClass('acc_highlight_up');
        $("#row_0_btn_" + i).removeClass('acc_highlight_down');
    }

    for (i = 0; i < HOHNER_GC_OPEN[1].length; i++) {
        $("#row_1_btn_" + i).removeClass('acc_highlight_up');
        $("#row_1_btn_" + i).removeClass('acc_highlight_down');
    }

}

function set_chord(chord_no, var_no) {
    clear_chords();
    note_list = chords[chord_no][c_variations][var_no][1];

    if (chords[chord_no][c_variations][var_no][0] == CLOSE) {
        func_mark = mark_button_up;
    } else {
        func_mark = mark_button_down;
    }

    for (i=0; i < note_list.length; i++) {
        func_mark(note_list[i][0], note_list[i][1]);
    }
}

function create_chord_items(my_div) {
    var c_complement = 1;

    // high level chords
    for (var c=0; c < chords.length; c++) {
        chord_initial_label = tone_labels[chords[c][c_symbol]] + chords[c][1];
        chord_tag = "<div class=\"chord_item\">";
        chord_tag += "<p id=\"chord_" + c + "\" class=\"chord_label\"> " + chord_initial_label + " </p>";

        //variations of the chord
        for (var v=0; v < chords[c][c_variations].length; v++) {
            chord_tag += "<div class=\"chord_var chord_var_";
            chord_tag += chords[c][c_variations][v][0] == OPEN ? "open" : "close";
            chord_tag += "\" onclick=\"set_chord(" + c + "," + v + ")\" >";

            chord_tag += " " + v + "</div>";
        }

        chord_tag += "</div>";
        $("#" + my_div).append(chord_tag);
    }
}


function fill_row(my_div, max_buttons) {
    for (var i=0; i < max_buttons; i++) {
        up_btn = "<p id=\"" + my_div + "_btn_" + i + "_up\" class=\"acc_label_up\"> A </p>";
        down_btn = "<p id=\"" + my_div + "_btn_" + i + "_down\"  class=\"acc_label_down\"> B </p>";
        div_str = "<div class=\"acc_button\" id=\"" + my_div + "_btn_" + i + "\"> " + up_btn + down_btn + " </div>";
        $("#" + my_div).append(div_str);
    }
}

function get_button_obj (row, button_number) {
    return $("#row_" + row + "_btn_" + button);
}

function mark_button_up (row, button) {
    $("#row_" + row + "_btn_" + button).addClass('acc_highlight_up');
}

function mark_button_down (row, button) {
    $("#row_" + row + "_btn_" + button).addClass('acc_highlight_down');
}

function set_button_label_up (row, button, label) {
    $("#row_" + row + "_btn_" + button + "_up").text(label);
}

function set_button_label_down (row, button, label) {
    $("#row_" + row + "_btn_" + button + "_down").text(label);
}

function set_chord_label (c, label) {
    $('#chord_' + c).text(label);
}

function set_tone(tones, tone_adjust, tone_labels) {
    up_row = 0;
    bottom_row = 1;

    up_row_length = tones[OPEN][up_row].length;
    for(var i=0; i < up_row_length; i++) {
        bottom_label_idx = (tones[OPEN][up_row][i] + tone_adjust) % int_tone.length;
        up_label_idx = (tones[CLOSE][up_row][i] + tone_adjust) % int_tone.length;
        
        set_button_label_up(0, i, tone_labels[up_label_idx]);
        set_button_label_down(0, i, tone_labels[bottom_label_idx]);
    }

    bottom_row_len = tones[OPEN][bottom_row].length;
    for(var i=0; i < bottom_row_len; i++) {
        bottom_label_idx = (tones[OPEN][bottom_row][i] + tone_adjust) % int_tone.length;
        up_label_idx = (tones[CLOSE][bottom_row][i] + tone_adjust) % int_tone.length;
        
        set_button_label_up(1, i, tone_labels[up_label_idx]);
        set_button_label_down(1, i, tone_labels[bottom_label_idx]);
    }

    for (var c=0; c < chords.length; c++) {
        tone_sym = (chords[c][c_symbol] + tone_adjust) % int_tone.length;
        tone_complement = chords[c][1];
        set_chord_label(c, tone_labels[tone_sym] + tone_complement);
    }

}
