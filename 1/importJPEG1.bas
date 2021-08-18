Sub Insert_Picture_Series()

    Dim objPicture As InlineShape
    Dim icount, istart, istop, DotPosition, inum, SeqNum As Integer
    Dim Max_num, Min_num As Integer
    Dim Answer, root, extension, strTitle, Cur_Dir, strFile As String
    Dim jjnum, PictureFile(1000) As String
    Dim MyFile As String
        
    Selection.ParagraphFormat.Alignment = wdAlignParagraphCenter
' Define size and alignment of text
    Selection.Font.Bold = True
    Selection.Font.Underline = False
    Selection.Font.Italic = False
    Selection.Font.Size = 12
'  Read variables
    root = InputBox("What is the root name?")
'  extension = InputBox("What is the file extension name?")
    extension = "JPG"
' Import a picture
' Returns filename with specified extension. If more than one
' file exists, the first file found is returned.
Cur_Dir = "m:\transfer\TATE\"
MyFile = Dir(Cur_Dir & root & "*." & extension)

SeqNum = 0
Max_num = 0
Min_num = 1000
Erase PictureFile
While MyFile <> ""

    DotPosition = InStr(MyFile, ".")
    jjnum = Mid(MyFile, DotPosition - 2, 1)
    If Str(Val(jjnum)) = " " & jjnum Then
        SeqNum = Val(Mid(MyFile, DotPosition - 2, 2)) + 1
        jjnum = Mid(MyFile, DotPosition - 2, 2)
    Else
        SeqNum = Val(Mid(MyFile, DotPosition - 1, 1))
        jjnum = "10" & Mid(MyFile, DotPosition - 1, 1)
    End If
    If SeqNum < Min_num Then Min_num = SeqNum
    If SeqNum > Max_num Then Max_num = SeqNum
    PictureFile(SeqNum) = Cur_Dir & MyFile
    MyFile = Dir
Wend 'End of Files

NoMoreFiles:
inum = 0
For icount = Min_num To Max_num

strFile = PictureFile(icount)
If strFile <> "" Then
inum = inum + 1

    Set objPicture = Selection.InlineShapes.AddPicture(strFile, False, True)
        With objPicture
            ' Modify picture properties
            .Fill.Visible = msoFalse
            .Fill.Transparency = 0#
            .Line.Weight = 0.75
            .Line.Transparency = 0#
            .Line.Visible = msoFalse
            .LockAspectRatio = msoTrue
            .Height = 250
            .Width = 332.346
            .PictureFormat.CropLeft = 0#
            .PictureFormat.CropRight = 0#
            .PictureFormat.CropTop = 0#
            .PictureFormat.CropBottom = 0#
        End With
    strTitle = "Figure " & CStr(inum) & ".  " & strFile
    strTitle = Chr(13) & strTitle & Chr(13) & Chr(13) & Chr(13) ' Create a legend
    Selection.TypeText (strTitle)  ' Insert the legend
End If

Next icount
endofprogram:
End Sub
